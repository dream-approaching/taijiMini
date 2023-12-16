import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { videoAdId } from '../index.config';
import CommonPage from '@src/components/CommonPage';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '健身气功八段锦',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return <CommonPage path='baduanjin/0508' videoAdId={videoAdId} />;
};
