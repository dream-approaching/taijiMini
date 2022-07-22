import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import CommonPage from '@src/components/CommonPage';
import PageContainer from '@src/components/PageContainer';
import { View, Text } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
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
  return (
    <CommonPage
      path='bafawubu'
      videoCustom
      imageDataConfig={imageDataConfig}
      videoDataConfig={videoDataConfig}
      render={({ videoList }) => {
        return (
          <PageContainer videoList={videoList} videoAdId={videoAdId}>
            <View>
              <View style={{ height: 20 }} />
              <TimelineList
                title='太极拳八法五步（又名太极十三势)'
                items={[
                  { title: '第 01 势   起势' },
                  { title: '第 02 势   左掤' },
                  { title: '第 03 势   右捋' },
                  { title: '第 04 势   左挤' },
                  { title: '第 05 势   双按' },
                  { title: '第 06 势   右採' },
                  { title: '第 07 势   左挒' },
                  { title: '第 08 势   左肘' },
                  { title: '第 09 势   右靠' },
                  { title: '第 10 势   右掤' },
                  { title: '第 11 势   左捋' },
                  { title: '第 12 势   右挤' },
                  { title: '第 13 势   双按' },
                  { title: '第 14 势   左採' },
                  { title: '第 15 势   右挒' },
                  { title: '第 16 势   右肘' },
                  { title: '第 17 势   左靠' },
                  { title: '第 18 势   进步左右掤' },
                  { title: '第 19 势   退步左右捋' },
                  { title: '第 20 势   左移步左挤' },
                  { title: '第 21 势   左移步双按' },
                  { title: '第 22 势   右移步右挤' },
                  { title: '第 23 势   右移步双按' },
                  { title: '第 24 势   退步左右採' },
                  { title: '第 25 势   进步左右挒' },
                  { title: '第 26 势   右移步右肘' },
                  { title: '第 27 势   右移步右靠' },
                  { title: '第 28 势   左移步左肘' },
                  { title: '第 29 势   左移步左靠' },
                  { title: '第 30 势   中定左右独立' },
                  { title: '第 31 势   十字手' },
                  { title: '第 32 势   收势' },
                ]}
              />
            </View>
          </PageContainer>
        );
      }}
    />
  );
};
