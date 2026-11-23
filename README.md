# taijiMini

## 介绍

![qrCode](./code.png)

太极拳小程序，以图文的形式呈现八法五步、健身气功八段锦、陈式太极拳 83 势等内容，旨在推广太极拳文化，帮助用户学习和练习太极拳

### 其他声明

- 本小程序所有图文视频均来自于**刘建成先生**(生于 1955 年，湖南邵东市人。自 1968 年起，勤奋修习多种拳术和器械。1998 年，拜入马虹先生门下，专心学习传统陈氏太极拳)。
- 本小程序所有内容均为个人兴趣爱好制作，仅供学习交流使用，欢迎转载分享共同学习推广太极拳文化

## 制作

### 素材制作流程

- 最全的视频在硬盘中
- 把原视频拷到手机
- 视频处理
  - 用手机自带视频编辑工具，把多个动作的裁减为单个动作
  - 再把单个动作裁减为 4 段，分别为 video_attack video_detail video_normal video_number
  - 导出后传到电脑，文件重命名为 video_attack / video_detail / video_normal / video_number
  - 本机需先安装 ffmpeg（仅首次）：`winget install Gyan.FFmpeg`，安装后确认 `ffmpeg -version` 可用（必要时重开终端）
  - 双击 `script/process_videos.bat`，选择视频文件夹，按提示设置体积上限（默认 15MB）和压缩轮数；每个视频至少压缩 1 轮，超标会继续压
  - 压缩完成后上传到小程序云开发的云存储（建议 15MB 以下）
- 图片处理
  - 图片用 U 盘传到电脑，用微信传名字会被改掉
  - 打开 video_number 视频，点击手机的截图
  - 双击 `script/rename_and_compress.bat`，选择图片文件夹，按提示设置体积上限（默认 160KB）和压缩轮数；脚本会依次：改名 → 压缩 → 选择对应 `dataConfig.json` 同步 `imageDataConfig` 的文件名（描述不动；多出的图会补 `83/文件夹名/文件名` 和空 desc）

#### 云存储需要放的文件

- 视频文件: video_attack video_detail video_normal video_number
- 图片文件: png、jpg
- 数据文件: dataConfig.json

客户端中的 dataConfig.json 不会直接生效，只是做一个备份作用，运行时取的是云存储中的 dataConfig.json 文件
