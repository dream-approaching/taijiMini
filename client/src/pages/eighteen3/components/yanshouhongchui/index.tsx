import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';
import useShare from '../../hooks/share';

export default () => {
  useShare();
  return <CommonPage path='83/yanshouhongchui' videoAdId={videoAdId} />;
};
