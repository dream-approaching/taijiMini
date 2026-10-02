#!/usr/bin/env node
/**
 * 批量压缩文件夹内的 png / jpg 图片。
 *
 * 用法:
 *   node compress_images.js
 *   node compress_images.js "E:\longzi\太极\yunshou"
 *   node compress_images.js . --max-kb 160 --max-rounds 5
 *
 * 说明:
 *   - 不传路径时，压缩当前目录
 *   - 不限制图片数量
 *   - 压缩后仍超过 max-kb 则继续压，最多 max-rounds 轮（上限 5）
 *   - 只覆盖写回确实变小的结果
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('缺少依赖 sharp，请先在 script 目录执行: npm install');
  process.exit(1);
}

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const DEFAULT_MAX_KB = 140;
const DEFAULT_MAX_ROUNDS = 5;

// 每轮更激进：JPG 降质量；PNG 减色/降质量；后期略缩尺寸
const JPEG_QUALITY = [82, 72, 62, 52, 42];
const PNG_QUALITY = [80, 70, 60, 50, 40];
const PNG_COLORS = [256, 192, 128, 96, 64];
const SCALE_BY_ROUND = [1, 1, 0.95, 0.9, 0.85];

function formatSize(numBytes) {
  if (numBytes < 1024) return `${numBytes} B`;
  if (numBytes < 1024 * 1024) return `${(numBytes / 1024).toFixed(1)} KB`;
  return `${(numBytes / (1024 * 1024)).toFixed(2)} MB`;
}

function parseArgs(argv) {
  const args = {
    path: '.',
    maxKb: DEFAULT_MAX_KB,
    maxRounds: DEFAULT_MAX_ROUNDS,
  };

  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--max-kb') {
      args.maxKb = Number(argv[i + 1]);
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
  if (!Number.isFinite(args.maxKb) || args.maxKb <= 0) args.maxKb = DEFAULT_MAX_KB;
  if (!Number.isFinite(args.maxRounds) || args.maxRounds <= 0) {
    args.maxRounds = DEFAULT_MAX_ROUNDS;
  }
  args.maxRounds = Math.min(5, Math.max(1, Math.floor(args.maxRounds)));
  return args;
}

function listImages(folder) {
  return fs
    .readdirSync(folder)
    .map((name) => path.join(folder, name))
    .filter((filePath) => {
      const stat = fs.statSync(filePath);
      if (!stat.isFile()) return false;
      return IMAGE_EXTS.has(path.extname(filePath).toLowerCase());
    })
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), 'zh'));
}

async function compressOnce(inputBuffer, ext, roundIdx) {
  const scale = SCALE_BY_ROUND[roundIdx];
  const meta = await sharp(inputBuffer, { failOn: 'none' }).metadata();
  const width = Math.max(1, Math.round((meta.width || 1) * scale));

  let pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate();
  if (scale < 0.999) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    return pipeline
      .jpeg({
        quality: JPEG_QUALITY[roundIdx],
        mozjpeg: true,
        chromaSubsampling: '4:2:0',
      })
      .toBuffer();
  }

  return pipeline
    .png({
      compressionLevel: 9,
      palette: true,
      quality: PNG_QUALITY[roundIdx],
      colours: PNG_COLORS[roundIdx],
      effort: 10,
    })
    .toBuffer();
}

async function compressFile(filePath, maxBytes, maxRounds) {
  const originalSize = fs.statSync(filePath).size;
  if (originalSize <= maxBytes) {
    return { status: 'skip', before: originalSize, after: originalSize, rounds: 0 };
  }

  const ext = path.extname(filePath).toLowerCase();
  let currentBuffer = fs.readFileSync(filePath);
  let bestSize = originalSize;
  let usedRounds = 0;
  let gained = false;

  for (let roundIdx = 0; roundIdx < maxRounds; roundIdx += 1) {
    usedRounds = roundIdx + 1;
    try {
      const data = await compressOnce(currentBuffer, ext, roundIdx);
      if (data.length < bestSize) {
        currentBuffer = data;
        bestSize = data.length;
        gained = true;
        fs.writeFileSync(filePath, data);
      }
      if (bestSize <= maxBytes) {
        return { status: 'ok', before: originalSize, after: bestSize, rounds: usedRounds };
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

  if (!gained) {
    return { status: 'no-gain', before: originalSize, after: originalSize, rounds: usedRounds };
  }
  return { status: 'oversize', before: originalSize, after: bestSize, rounds: usedRounds };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`用法:
  node compress_images.js [文件夹] [--max-kb 160] [--max-rounds 5]

示例:
  node compress_images.js
  node compress_images.js "E:\\photos"
  node compress_images.js . --max-kb 120`);
    return 0;
  }

  const folder = path.resolve(args.path);
  const maxBytes = args.maxKb * 1024;

  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    console.error(`目录不存在: ${folder}`);
    return 1;
  }

  const images = listImages(folder);
  if (!images.length) {
    console.log(`未找到 png/jpg: ${folder}`);
    return 0;
  }

  console.log(`目录: ${folder}`);
  console.log(`图片: ${images.length} 张 | 上限: ${args.maxKb} KB | 最多: ${args.maxRounds} 轮`);
  console.log('-'.repeat(60));

  const stats = { ok: 0, skip: 0, oversize: 0, 'no-gain': 0, error: 0 };
  let saved = 0;

  for (const filePath of images) {
    const result = await compressFile(filePath, maxBytes, args.maxRounds);
    const key = result.status.startsWith('error') ? 'error' : result.status;
    stats[key] = (stats[key] || 0) + 1;
    saved += Math.max(0, result.before - result.after);

    const tagMap = {
      ok: '完成',
      skip: '跳过',
      oversize: '仍超标',
      'no-gain': '无收益',
    };
    const tag = tagMap[result.status] || result.status;
    const ratio = result.before ? (1 - result.after / result.before) * 100 : 0;
    console.log(`[${tag}] ${path.basename(filePath)}  ` + `${formatSize(result.before)} -> ${formatSize(result.after)}  ` + `(${ratio.toFixed(1)}%, ${result.rounds}轮)`);
  }

  console.log('-'.repeat(60));
  console.log(`完成: ${stats.ok} | 跳过: ${stats.skip} | 仍超标: ${stats.oversize} | ` + `无收益: ${stats['no-gain']} | 失败: ${stats.error}`);
  console.log(`共节省: ${formatSize(saved)}`);
  return 0;
}

main().then((code) => process.exit(code));
