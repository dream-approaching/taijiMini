import { videoType } from '@src/config/constants';

export const imageDataConfig = {
  '83/zhongpan/142548.jpg': { title: '顺缠砍掌，与肩同高' },
  '83/zhongpan/142552.jpg': {
    title: '左手变勾手，右手从左手腕背上撩出去，开左胸，外折腕，腕跟肩同高',
  },
  '83/zhongpan/142557.jpg': { title: '擒拿压肘' },
  '83/zhongpan/142606.jpg': { title: '推掌' },
  '83/zhongpan/142621.jpg': { title: '松胯下沉，下塌后捋，左手在两膝的中线，右手在右膝的外侧，' },
  '83/zhongpan/142625.jpg': { title: '再往前靠' },
  '83/zhongpan/142631.jpg': { title: '再往后移，开左脚尖，两手同时翻掌' },
  '83/zhongpan/142641.jpg': { title: '走肩走肘，提膝走手，右手在额头上方，左手在左膝上方' },
  '83/zhongpan/142645.jpg': { title: '震脚，两脚平行，相距约 10-20cm,掌心相对，与腹同高.jpg' },
  '83/zhongpan/142649.jpg': { title: '下蹬右引' },
  '83/zhongpan/142654.jpg': { title: '踏实松胯，重心左移，两肘掤开，两掌相对' },
  '83/zhongpan/142659.jpg': { title: '两手背相对，戳掌' },
  '83/zhongpan/142709.jpg': { title: '指尖往上挑' },
  '83/zhongpan/142713.jpg': { title: '合手，两臂撑圆' },
  '83/zhongpan/142718.jpg': {
    title: '挒开，胸向右转，右手在右膝的外侧，左手在左眼的前方，视线看前面',
  },
};

export const videoDataConfig = {
  [videoType.attack.name]: {
    title: '攻防含义',
    shotInfo: '吴少华 2019年10月27日 娄底市',
  },
  [videoType.detail.name]: {
    title: '动作要领',
    shotInfo: '吴少华 2019年10月27日 娄底市',
  },
  [videoType.number.name]: {
    title: '分解动作',
    shotInfo: '吴少华 2019年10月27日 娄底市',
  },
  [videoType.normal.name]: {
    title: '正常',
    shotInfo: '吴少华 2019年10月27日 娄底市',
  },
};
