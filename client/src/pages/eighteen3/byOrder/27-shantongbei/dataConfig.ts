import { videoType } from '@src/config/constants';

export const imageDataConfig = {
  '83/shantongbei/141027.jpg': { desc: '胸向右转，两指尖相对，两臂掤圆' },
  '83/shantongbei/141031.jpg': { desc: '胸向左转，两手往上掤，身体往下沉' },
  '83/shantongbei/141035.jpg': { desc: '胸向右转，两掌根相合在腹前' },
  '83/shantongbei/141100.jpg': { desc: '胸向左转，两手往上托' },
  '83/shantongbei/141109.jpg': { desc: '重心右移，两手环抱于胸前，同时扣左脚' },
  '83/shantongbei/141140.jpg': { desc: '扣右脚' },
  '83/shantongbei/141154.jpg': { desc: '蓄劲，倒重心，扫腿滚肘，力在右肘' },
  '83/shantongbei/141203.jpg': { desc: '两手掤开，两掌心相搓' },
  '83/shantongbei/141208.jpg': { desc: '松胯下座撩掌' },
  '83/shantongbei/141213.jpg': { desc: '胸向左转，抱掌' },
  '83/shantongbei/141218.jpg': {
    desc: '两手挒开，左手指尖朝右，虎口朝上，右手掌心朝前，指尖朝上，两肘下沉',
  },
  '83/shantongbei/141222.jpg': { desc: '转体盘步，右手在腹前，左手腕跟肩同高' },
  '83/shantongbei/141228.jpg': { desc: '重心前移抬左膝，边提边沉，两掌背相合在膝的上方' },
  '83/shantongbei/141233.jpg': { desc: '上步，与肩同宽' },
  '83/shantongbei/141236.jpg': { desc: '踏实松胯，约向右转' },
  '83/shantongbei/141240.jpg': { desc: '放松，蓄劲，左转穿掌' },
  '83/shantongbei/141245.jpg': { desc: '右手逆缠在右眼前方，左手顺缠在膝的内侧' },
  '83/shantongbei/141253.jpg': { desc: '重心后移，扣左脚' },
  '83/shantongbei/141257.jpg': { desc: '重心前移，收右脚向左顶胯，同时手向上托' },
  '83/shantongbei/141303.jpg': { desc: '转体劈掌，左手腕跟肩同高，右手在右膝上方' },
};

export const videoDataConfig = {
  [videoType.attack.name]: {
    title: '攻防含义',
    shotInfo: '吴少华 2019年10月28日 娄底市',
  },
  [videoType.detail.name]: {
    title: '动作要领',
    shotInfo: '吴少华 2019年10月28日 娄底市',
  },
  [videoType.number.name]: {
    title: '分解动作',
    shotInfo: '吴少华 2019年10月28日 娄底市',
  },
  [videoType.normal.name]: {
    title: '正常',
    shotInfo: '吴少华 2019年10月28日 娄底市',
  },
};
