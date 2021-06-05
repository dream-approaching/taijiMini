import Taro from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';

export default () => {
  return (
    <CommonPage
      path='baduanjin'
      videoCustom
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
    />
  );
};
