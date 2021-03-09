import config from '@src/config';

export const getFileCloudId = (path: string) => {
  return `${config.baseUrlStorage}/${path}`;
};
