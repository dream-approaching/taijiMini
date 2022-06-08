import { videoType } from '@src/config/constants';

export const imageDataConfig = {
  '83/baiheliangchi/180224.jpg': { title: '胸向右转加掤劲，低于胸，高于腹' },
  '83/baiheliangchi/180230.jpg': { title: '收回来' },
  '83/baiheliangchi/180233.jpg': { title: '向左加掤劲' },
  '83/baiheliangchi/180239.jpg': { title: '穿掌坐腕在眼前中线' },
  '83/baiheliangchi/180244.jpg': { title: '双逆缠加掤劲' },
  '83/baiheliangchi/180254.jpg': {
    title: '胸向左转开左脚 45°，两手分开，右手在右眼前方，左手在左胯旁',
  },
  '83/baiheliangchi/180259.jpg': { title: '裆走下弧倒重心，边提边沉，肘膝相合' },
  '83/baiheliangchi/180304.jpg': { title: '斜角蹬出去，两手相合，与胸同高，左手立掌' },
  '83/baiheliangchi/180308.jpg': { title: '松胯踏实' },
  '83/baiheliangchi/180312.jpg': { title: '裆走下弧倒重心螺旋靠上去，肩胯同时靠' },
  '83/baiheliangchi/180316.jpg': { title: '右手翻掌加掤劲' },
  '83/baiheliangchi/180320.jpg': { title: '胸向右转，虚步分掌，两虎口相对' },
  '83/baiheliangchi/180324.jpg': { title: '下塌外捻，两掌根相合，右手在右眼前方，左手在左跨旁' },
  '83/baiheliangchi/180328.jpg': { title: '右转加掤劲，里折腕，右手在右眼前方' },
  '83/baiheliangchi/180334.jpg': { title: '左转拦在眼前中线' },
  '83/baiheliangchi/180338.jpg': {
    title: '右手划个 S 型往下採，左手提上来劈下去，右脚打开 45°，左手腕跟肩同高，右手在右胯旁',
  },
  '83/baiheliangchi/180344.jpg': { title: '裆走下弧倒重心，边提边沉，肘膝相合' },
  '83/baiheliangchi/180353.jpg': { title: '向前加一个掤劲' },
  '83/baiheliangchi/180400.jpg': { title: '下蹬后捋' },
  '83/baiheliangchi/180410.jpg': { title: '踏实右转摆手与肩同高' },
  '83/baiheliangchi/180415.jpg': { title: '合手摆头' },
  '83/baiheliangchi/180419.jpg': { title: '搂膝滚肘，重心在后，左手在左膝外侧' },
  '83/baiheliangchi/180423.jpg': {
    title: '左手勾手，右手往下按再往前推，同时倒重心，推到左胸前，在左膝的内侧',
  },
  '83/baiheliangchi/180427.jpg': { title: '胸约向左转，双逆缠加掤劲' },
  '83/baiheliangchi/180431.jpg': { title: '胸向右转，走肩走肘走手' },
  '83/baiheliangchi/180435.jpg': { title: '走到手脚相合的地方，胸向左转，下塌外捻，勾手掤圆' },
  '83/baiheliangchi/180441.jpg': { title: '胸向右转，两手下落，两指尖相对，两臂掤圆' },
  '83/baiheliangchi/180445.jpg': { title: '胸向左转，两手往上掤，身体往下沉' },
  '83/baiheliangchi/180449.jpg': { title: '胸向右转，两掌根相合在腹前' },
  '83/baiheliangchi/180452.jpg': { title: '胸向左转，两手往上托，右手小指在肘手小臂内侧' },
  '83/baiheliangchi/180504.jpg': { title: '双逆缠往下按' },
  '83/baiheliangchi/180507.jpg': { title: '扣右脚' },
  '83/baiheliangchi/180511.jpg': { title: '重心后移，收脚踮地' },
  '83/baiheliangchi/180515.jpg': { title: '提膝下採' },
  '83/baiheliangchi/180519.jpg': { title: '塌掌根' },
  '83/baiheliangchi/180523.jpg': { title: '加掤劲' },
  '83/baiheliangchi/180526.jpg': { title: '往后下捋，膝往上顶' },
  '83/baiheliangchi/180537.jpg': { title: '翻掌' },
  '83/baiheliangchi/180542.jpg': { title: '摆脚合手，脚跟落地，两手与胸同高' },
  '83/baiheliangchi/180603.jpg': { title: '踏实松胯，重心前移，跪膝，擒拿滚肘' },
  '83/baiheliangchi/180607.jpg': { title: '裆走下弧倒重心，边提边沉肘膝相合' },
  '83/baiheliangchi/180611.jpg': { title: '斜角蹬出去' },
  '83/baiheliangchi/180614.jpg': { title: '里扣踏实' },
  '83/baiheliangchi/180617.jpg': { title: '松胯下沉，裆走下弧倒重心螺旋靠上去，肩胯同时靠' },
  '83/baiheliangchi/180621.jpg': { title: '加掤劲，胸向右转，走肩走肘走手' },
  '83/baiheliangchi/180623.jpg': {
    title: '胸向左转，下塌外捻，两手掤圆，肩与胯合，肘与膝合，手与脚合',
  },
};

export const videoDataConfig = {
  [videoType.attack.name]: {
    title: '攻防含义',
    shotInfo: '吴少华 2019年11月25日 娄底市',
  },
  [videoType.detail.name]: {
    title: '动作要领',
    shotInfo: '吴少华 2019年11月25日 娄底市',
  },
  [videoType.number.name]: {
    title: '分解动作',
    shotInfo: '吴少华 2019年11月25日 娄底市',
  },
  [videoType.normal.name]: {
    title: '正常',
    shotInfo: '吴少华 2019年11月25日 娄底市',
  },
};
