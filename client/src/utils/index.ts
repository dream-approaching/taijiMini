import config from '@src/config';
import EventUtil from './eventUtils';

// 拼接云存储cloudId
export const getFileCloudId = (path: string) => {
  return `${config.baseUrlStorage}/${path}`;
};

// 获取数组最后一个元素
export const lastArr = (arr: Array<any>) => {
  return arr[arr.length - 1];
};

export const getVideoType = (path: string) => {
  const fileName = lastArr(path.split('/'));
  const type = fileName.split('.')[0].split('_')[1];
  return type;
};

export function muchclickEvent(much, dom, fn) {
  // 禁止双击事件
  EventUtil.removeHandler(dom, 'dblclick', null);

  much = parseInt(much, 10) < 1 ? 1 : parseInt(much, 10);

  let count = 0;
  let lastTime = 0;

  const handler = event => {
    const currentTime = new Date().getTime();
    count = currentTime - lastTime < 500 ? count + 1 : 0;
    lastTime = new Date().getTime();
    if (count >= much - 1) {
      fn(event, much);
      count = 0;
    }
  };

  EventUtil.addHandler(dom, 'tap', handler);
}
