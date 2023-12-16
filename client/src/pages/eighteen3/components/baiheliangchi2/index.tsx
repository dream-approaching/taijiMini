import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 白鹤亮翅',
      path: '/pages/eighteen3/baiheliangchi/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 白鹤亮翅',
      path: '/pages/eighteen3/baiheliangchi/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 白鹤亮翅',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return <CommonPage path='83/baiheliangchi2' videoAdId={videoAdId} />;
};
