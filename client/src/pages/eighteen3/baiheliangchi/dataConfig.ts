import { videoType } from '@src/config/constants';

export const imageDataConfig = {};

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
