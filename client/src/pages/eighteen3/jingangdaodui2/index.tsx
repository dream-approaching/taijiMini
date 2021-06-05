import Taro from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';

export default () => {
  return (
    <CommonPage
      path='83/jingangdaodui2'
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
    />
  );
};
