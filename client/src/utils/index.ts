import config from '@src/config';

export const getFileCloudId = (path: string) => {
  return `${config.baseUrlStorage}/${path}`;
};

export const lastArr = (arr: Array<any>) => {
  return arr[arr.length - 1];
};
