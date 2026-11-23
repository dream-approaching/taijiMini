#!/usr/bin/env node
/**
 * 批量压缩文件夹内的 mp4 / mov 视频（依赖本机 ffmpeg）。
 *
 * 用法:
 *   node compress_videos.js
 *   node compress_videos.js "E:\longzi\太极\yunshou"
 *   node compress_videos.js . --max-mb 15 --max-rounds 5
 *
 * 说明:
 *   - 不传路径时，压缩当前目录
 *   - 每个视频至少压缩 1 轮；仍超过 max-mb 则继续压，最多 max-rounds 轮（上限 5）
 *   - 只覆盖写回确实变小的结果
 *   - 需要本机已安装 ffmpeg，并加入 PATH
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.m4v']);
const DEFAULT_MAX_MB = 15;
const DEFAULT_MAX_ROUNDS = 5;
const TEMP_MARK = '.__compress_tmp__';
const BAK_MARK = '.__compress_bak__';

// 每轮更激进：提高 CRF、略降分辨率、略降音频码率
const CRF_BY_ROUND = [26, 30, 34, 38, 42];
const SCALE_BY_ROUND = [1, 1, 0.85, 0.75, 0.65];
const AUDIO_KBPS = [96, 80, 64, 48, 32];
const PRESET = 'medium';

function formatSize(numBytes) {
  if (numBytes < 1024) return `${numBytes} B`;
  if (numBytes < 1024 * 1024) return `${(numBytes / 1024).toFixed(1)} KB`;
  return `${(numBytes / (1024 * 1024)).toFixed(2)} MB`;
}

function parseArgs(argv) {
  const args = {
    path: '.',
    maxMb: DEFAULT_MAX_MB,
    maxRounds: DEFAULT_MAX_ROUNDS,
  };

  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--max-mb') {
      args.maxMb = Number(argv[i + 1]);
      i += 1;
    } else if (token === '--max-rounds') {
      args.maxRounds = Number(argv[i + 1]);
      i += 1;
    } else if (token === '--help' || token === '-h') {
      args.help = true;
    } else if (!token.startsWith('-')) {
      positionals.push(token);
    }
  }

  if (positionals[0]) args.path = positionals[0];
  if (!Number.isFinite(args.maxMb) || args.maxMb <= 0) args.maxMb = DEFAULT_MAX_MB;
  if (!Number.isFinite(args.maxRounds) || args.maxRounds <= 0) {
    args.maxRounds = DEFAULT_MAX_ROUNDS;
  }
  args.maxRounds = Math.min(5, Math.max(1, Math.floor(args.maxRounds)));
  return args;
}

function ensureFfmpeg() {
  const res = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  if (res.error || res.status !== 0) {
    console.error('未找到 ffmpeg。请先安装并加入 PATH，例如:');
    console.error('  winget install Gyan.FFmpeg');
    console.error('  或从 https://ffmpeg.org/download.html 下载');
    return false;
  }
  return true;
}

function listVideos(folder) {
  return fs
    .readdirSync(folder)
    .map((name) => path.join(folder, name))
    .filter((filePath) => {
      const name = path.basename(filePath);
      if (name.includes(TEMP_MARK) || name.includes(BAK_MARK)) return false;
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) return false;
      return VIDEO_EXTS.has(path.extname(filePath).toLowerCase());
    })
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), 'zh'));
}

function probeSize(filePath) {
  return fs.statSync(filePath).size;
}

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // 短等待，用于 Windows 文件占用重试
  }
}

function safeUnlink(filePath) {
  if (!fs.existsSync(filePath)) return;
  let lastErr;
  for (let i = 0; i < 5; i += 1) {
    try {
      fs.unlinkSync(filePath);
      return;
    } catch (err) {
      lastErr = err;
      sleep(120 * (i + 1));
    }
  }
  throw lastErr;
}

/** Windows 上直接 copy 覆盖常因文件占用报 EPERM，改为先挪走原文件再 rename */
function replaceFile(tempPath, targetPath) {
  const bakPath = `${targetPath}${BAK_MARK}${process.pid}`;
  let lastErr;
  for (let i = 0; i < 5; i += 1) {
    try {
      if (fs.existsSync(bakPath)) safeUnlink(bakPath);
      fs.renameSync(targetPath, bakPath);
      try {
        fs.renameSync(tempPath, targetPath);
      } catch (err) {
        // 回滚原文件
        if (!fs.existsSync(targetPath) && fs.existsSync(bakPath)) {
          fs.renameSync(bakPath, targetPath);
        }
        throw err;
      }
      try {
        safeUnlink(bakPath);
      } catch (_) {
        // 压缩结果已就位，清理备份失败不阻断
      }
      return;
    } catch (err) {
      lastErr = err;
      sleep(150 * (i + 1));
    }
  }
  const hint =
    lastErr && (lastErr.code === 'EPERM' || lastErr.code === 'EBUSY')
      ? '（文件被占用：请关闭播放器/资源管理器预览后重试）'
      : '';
  throw new Error(`${lastErr && lastErr.message ? lastErr.message : lastErr}${hint}`);
}

function compressOnce(inputPath, outputPath, roundIdx) {
  const crf = CRF_BY_ROUND[roundIdx];
  const scale = SCALE_BY_ROUND[roundIdx];
  const audioKbps = AUDIO_KBPS[roundIdx];

  const vf =
    scale < 0.999
      ? `scale=trunc(iw*${scale}/2)*2:trunc(ih*${scale}/2)*2`
      : 'scale=trunc(iw/2)*2:trunc(ih/2)*2';

  const args = [
    '-y',
    '-i',
    inputPath,
    '-vf',
    vf,
    '-c:v',
    'libx264',
    '-preset',
    PRESET,
    '-crf',
    String(crf),
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    `${audioKbps}k`,
    '-movflags',
    '+faststart',
    outputPath,
  ];

  const res = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (res.status !== 0) {
    const detail = (res.stderr || res.stdout || res.error || 'unknown').toString();
    const tail = detail.split(/\r?\n/).filter(Boolean).slice(-8).join('\n');
    throw new Error(tail || `ffmpeg exit ${res.status}`);
  }
}

function compressFile(filePath, maxBytes, maxRounds) {
  const originalSize = probeSize(filePath);
  const ext = path.extname(filePath).toLowerCase() || '.mp4';
  const tempPath = path.join(
    os.tmpdir(),
    `taiji-video-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}${TEMP_MARK}${ext}`,
  );
  let bestSize = originalSize;
  let usedRounds = 0;
  let gained = false;
  let sourcePath = filePath;

  try {
    for (let roundIdx = 0; roundIdx < maxRounds; roundIdx += 1) {
      // 第 1 轮必压；后续轮仅在仍超标时继续
      if (roundIdx > 0 && bestSize <= maxBytes) break;

      usedRounds = roundIdx + 1;
      try {
        compressOnce(sourcePath, tempPath, roundIdx);
        const nextSize = probeSize(tempPath);
        if (nextSize < bestSize) {
          replaceFile(tempPath, filePath);
          bestSize = nextSize;
          gained = true;
          sourcePath = filePath;
        } else if (fs.existsSync(tempPath)) {
          safeUnlink(tempPath);
        }
      } catch (err) {
        return {
          status: `error:${err.message}`,
          before: originalSize,
          after: bestSize,
          rounds: usedRounds,
        };
      }
    }
  } finally {
    if (fs.existsSync(tempPath)) {
      try {
        safeUnlink(tempPath);
      } catch (_) {
        // ignore
      }
    }
  }

  if (!gained) {
    return { status: 'no-gain', before: originalSize, after: originalSize, rounds: usedRounds };
  }
  if (bestSize > maxBytes) {
    return { status: 'oversize', before: originalSize, after: bestSize, rounds: usedRounds };
  }
  return { status: 'ok', before: originalSize, after: bestSize, rounds: usedRounds };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`用法:
  node compress_videos.js [文件夹] [--max-mb 15] [--max-rounds 5]

示例:
  node compress_videos.js
  node compress_videos.js "E:\\videos"
  node compress_videos.js . --max-mb 10`);
    return 0;
  }

  if (!ensureFfmpeg()) return 1;

  const folder = path.resolve(args.path);
  const maxBytes = args.maxMb * 1024 * 1024;

  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    console.error(`目录不存在: ${folder}`);
    return 1;
  }

  const videos = listVideos(folder);
  if (!videos.length) {
    console.log(`未找到 mp4/mov: ${folder}`);
    return 0;
  }

  console.log(`目录: ${folder}`);
  console.log(
    `视频: ${videos.length} 个 | 上限: ${args.maxMb} MB | 至少 1 轮，最多 ${args.maxRounds} 轮`,
  );
  console.log('-'.repeat(60));

  const stats = { ok: 0, oversize: 0, 'no-gain': 0, error: 0 };
  let saved = 0;

  for (const filePath of videos) {
    const result = compressFile(filePath, maxBytes, args.maxRounds);
    const key = result.status.startsWith('error') ? 'error' : result.status;
    stats[key] = (stats[key] || 0) + 1;
    saved += Math.max(0, result.before - result.after);

    const tagMap = {
      ok: '完成',
      oversize: '仍超标',
      'no-gain': '无收益',
    };
    const tag = tagMap[result.status] || result.status;
    const ratio = result.before ? (1 - result.after / result.before) * 100 : 0;
    console.log(
      `[${tag}] ${path.basename(filePath)}  ` +
        `${formatSize(result.before)} -> ${formatSize(result.after)}  ` +
        `(${ratio.toFixed(1)}%, ${result.rounds}轮)`,
    );
  }

  console.log('-'.repeat(60));
  console.log(
    `完成: ${stats.ok} | 仍超标: ${stats.oversize} | ` +
      `无收益: ${stats['no-gain']} | 失败: ${stats.error}`,
  );
  console.log(`共节省: ${formatSize(saved)}`);
  return 0;
}

process.exit(main());
