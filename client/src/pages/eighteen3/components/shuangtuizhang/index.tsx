import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 双推掌 三换掌 倒卷肱',
      path: '/pages/eighteen3/19-21-shuangtuizhang/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 双推掌 三换掌 倒卷肱',
      path: '/pages/eighteen3/19-21-shuangtuizhang/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 双推掌 三换掌 倒卷肱',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return (
    <CommonPage
      path='83/shuangtuizhang'
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
      videoAdId={videoAdId}
      showImgIndex
    />
  );
};
