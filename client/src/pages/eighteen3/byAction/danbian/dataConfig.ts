import { videoType } from '@src/config/constants';

export const imageDataConfig = {
  '83/danbian/104955.jpg': {
    desc: '双顺缠，两手螺旋穿上去，左手中指领劲，与对方喉同高，右手小指在左手小臂内侧，右肘要掤起来',
  },
  '83/danbian/105000.jpg': { desc: '胸向左转，旋腕擒拿压肘，肘和掌心相合' },
  '83/danbian/105006.jpg': { desc: '先走肘，再走手，腕跟肩同高，指尖斜朝后' },
  '83/danbian/105010.jpg': { desc: '胸向左转，眼往左看' },
  '83/danbian/105016.jpg': { desc: '边提边沉，肘膝相合' },
  '83/danbian/105020.jpg': { desc: '约偏后蹬出去' },
  '83/danbian/105024.jpg': { desc: '踏实松胯' },
  '83/danbian/105041.jpg': {
    desc: '重心前移，裆走下弧倒重心螺旋靠上去，肩胯同时靠，边靠边扣右脚尖',
  },
  '83/danbian/105049.jpg': { desc: '重心后移，穿掌坐腕在胸前' },
  '83/danbian/105056.jpg': { desc: '加掤劲，胸往左转，走肩走肘走手' },
  '83/danbian/105106.jpg': { desc: '下塌外捻，勾手掤圆，前弓后蹬' },
};

export const videoDataConfig = {
  [videoType.attack.name]: {
    title: '攻防含义',
    shotInfo: '吴少华 2019年11月22日 娄底市',
  },
  [videoType.detail.name]: {
    title: '动作要领',
    shotInfo: '吴少华 2019年11月22日 娄底市',
  },
  [videoType.number.name]: {
    title: '分解动作',
    shotInfo: '吴少华 2019年11月22日 娄底市',
  },
  [videoType.normal.name]: {
    title: '正常',
    shotInfo: '吴少华 2019年11月22日 娄底市',
  },
};
