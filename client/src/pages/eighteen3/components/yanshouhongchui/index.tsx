import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default () => {
  useShareAppMessage(() => {
    return {
      title: '老架一路: 掩手肱捶',
      path: '/pages/eighteen3/yanshouhongchui/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  });
  useShareTimeline(() => {
    return {
      title: '老架一路: 掩手肱捶',
      path: '/pages/eighteen3/yanshouhongchui/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  useAddToFavorites(() => {
    return {
      title: '老架一路: 掩手肱捶',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  });
  return <CommonPage path='83/yanshouhongchui' videoAdId={videoAdId} />;
};
