import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '太极八法五步',
      path: '/pages/bafawubu/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '太极八法五步',
      path: '/pages/bafawubu/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '太极八法五步',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });

  return <CommonPage path='bafawubu/1819' videoAdId={videoAdId} />;
};
