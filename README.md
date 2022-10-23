# taijiMini

### 素材制作流程

-   最全的视频在硬盘中
-   把原视频拷到手机
-   视频处理
    -   用手机自带视频编辑工具，把多个动作的裁减为单个动作
    -   再把单个动作裁减为 4 段，分别为 video_attack video_detail video_normal video_number
    -   把导出的文件用微信，文件助手发送到电脑(因为压缩出来的还是太大了，借助微信压缩)
    -   在电脑上右键打开文件，此时的文件是经过微信压缩的，尺寸小很多，保存到已完成文件夹
    -   文件重命名 video_attack video_detail video_normal video_number
    -   上传到小程序云开发的云存储
-   图片处理
    -   打开 video_number 视频，点击手机的截图
    -   用脚本改名字，脚本在根目录有，要在每个图片文件夹放一份
    -   图片压缩
