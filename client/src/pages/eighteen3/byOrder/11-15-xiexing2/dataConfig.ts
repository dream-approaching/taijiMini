import { videoType } from '@src/config/constants';

export const imageDataConfig = {
  '83/xiexing2/142418.jpg': { title: '重心右移，胸向右转，掤，左手在腹前中线，右手与肩同高' },
  '83/xiexing2/142423.jpg': { title: '松胯踏实，裆走后弧倒重心，右手落在膝的上方' },
  '83/xiexing2/142427.jpg': {
    title: '裆走下弧倒重心螺旋靠上去，肩胯同时靠，右手在胸前中线，掌心朝上，左手在左跨旁，掌心朝下',
  },
  '83/xiexing2/142433.jpg': { title: '裆走下弧倒重心，开右脚，右手立掌加掤劲' },
  '83/xiexing2/142437.jpg': { title: '扫腿合手' },
};

export const videoDataConfig = {
  [videoType.detail.name]: {
    title: '动作要领',
    shotInfo: '吴少华 2019年11月29日 娄底市',
  },
  [videoType.number.name]: {
    title: '分解动作',
    shotInfo: '吴少华 2019年11月29日 娄底市',
  },
  [videoType.normal.name]: {
    title: '正常',
    shotInfo: '吴少华 2019年11月29日 娄底市',
  },
};
