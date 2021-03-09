import config from '@src/config';

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
