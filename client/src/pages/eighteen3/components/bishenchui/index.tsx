import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 庇身锤 青龙出水',
      path: '/pages/eighteen3/17-18-bishenchui/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 庇身锤 青龙出水',
      path: '/pages/eighteen3/17-18-bishenchui/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 庇身锤 青龙出水',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return <CommonPage path='83/bishenchui' videoAdId={videoAdId} />;
};
