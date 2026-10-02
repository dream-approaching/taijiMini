#!/usr/bin/env node
/**
 * 按图片文件夹顺序，替换 dataConfig.json 里 imageDataConfig 的 key 文件名。
 * value 原样保留；多出来的图片用模板补：83/taiji/文件名 -> {"desc":""}
 *
 * 用法:
 *   node sync_image_config.js "图片文件夹" "dataConfig.json路径"
 */

const fs = require('fs');
const path = require('path');

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const EXTRA_PREFIX = '83/taiji/';

function listImages(folder) {
  return fs
    .readdirSync(folder)
    .filter((name) => {
      const full = path.join(folder, name);
      return fs.statSync(full).isFile() && IMAGE_EXTS.has(path.extname(name).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b, 'zh', { numeric: true }));
}

function replaceFilename(oldKey, filename) {
  const idx = oldKey.lastIndexOf('/');
  if (idx === -1) return filename;
  return `${oldKey.slice(0, idx + 1)}${filename}`;
}

function syncConfig(imageDir, jsonPath) {
  if (!fs.existsSync(imageDir) || !fs.statSync(imageDir).isDirectory()) {
    throw new Error(`图片目录不存在: ${imageDir}`);
  }
  if (!fs.existsSync(jsonPath) || !fs.statSync(jsonPath).isFile()) {
    throw new Error(`JSON 不存在: ${jsonPath}`);
  }

  const images = listImages(imageDir);
  if (!images.length) {
    throw new Error(`目录内没有 png/jpg: ${imageDir}`);
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw);
  if (!data.imageDataConfig || typeof data.imageDataConfig !== 'object') {
    data.imageDataConfig = {};
  }

  const oldEntries = Object.entries(data.imageDataConfig);
  const next = {};

  images.forEach((filename, i) => {
    if (i < oldEntries.length) {
      const [oldKey, value] = oldEntries[i];
      const newKey = replaceFilename(oldKey, filename);
      next[newKey] = value;
      console.log(`[保留] ${oldKey} -> ${newKey}`);
    } else {
      const newKey = `${EXTRA_PREFIX}${filename}`;
      next[newKey] = { desc: '' };
      console.log(`[新增] ${newKey}`);
    }
  });

  if (oldEntries.length > images.length) {
    const dropped = oldEntries.length - images.length;
    console.log(`提示: JSON 原有 ${oldEntries.length} 条，图片只有 ${images.length} 张，已去掉末尾 ${dropped} 条`);
  }

  data.imageDataConfig = next;
  fs.writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  console.log('-'.repeat(50));
  console.log(`图片: ${images.length} | 原配置: ${oldEntries.length} | 现配置: ${Object.keys(next).length}`);
  console.log(`已写入: ${jsonPath}`);
}

function main() {
  const imageDir = process.argv[2];
  const jsonPath = process.argv[3];
  if (!imageDir || !jsonPath) {
    console.error('用法: node sync_image_config.js "图片文件夹" "dataConfig.json"');
    process.exit(1);
  }
  try {
    syncConfig(path.resolve(imageDir), path.resolve(jsonPath));
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
