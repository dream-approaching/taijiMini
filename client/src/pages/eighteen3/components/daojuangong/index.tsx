import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 倒卷肱 退步压肘',
      path: '/pages/eighteen3/22-23-daojuangong/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 倒卷肱 退步压肘',
      path: '/pages/eighteen3/22-23-daojuangong/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 倒卷肱 退步压肘',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return (
    <CommonPage
      path='83/daojuangong'
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
      videoAdId={videoAdId}
      showImgIndex
    />
  );
};
