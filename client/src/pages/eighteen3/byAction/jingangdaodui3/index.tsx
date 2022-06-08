import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 第三金刚捣碓',
      path: '/pages/eighteen3/jingangdaodui3/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 第三金刚捣碓',
      path: '/pages/eighteen3/jingangdaodui3/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 第三金刚捣碓',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return (
    <CommonPage
      path='83/jingangdaodui3'
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
    />
  );
};
