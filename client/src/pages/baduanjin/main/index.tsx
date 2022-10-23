import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';
import { getFileCloudId } from '@src/utils';

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

  const imgKey = 'baduanjin/20220714204624.jpg';
  const handlePreviewImg = () => {
    Taro.previewImage({
      current: getFileCloudId(imgKey), // 当前显示图片的http链接
      urls: [getFileCloudId(imgKey)], // 需要预览的图片http链接列表
    });
  };
  return (
    <PageContainer>
      <View>
        <View style={{ height: 20 }} />
        <TimelineList
          title='口诀'
          items={[
            { title: '两手托天理三焦' },
            { title: '左右开弓似射雕' },
            { title: '调理脾胃须单举' },
            { title: '五劳七伤往后瞧' },
            { title: '摇头摆尾去心火' },
            { title: '两手攀足固肾腰' },
            { title: '攒拳怒目增气力' },
            { title: '背后七颠百病消' },
          ]}
        />
        <Image
          onClick={handlePreviewImg}
          mode='widthFix'
          lazyLoad
          style={{ width: '90%', marginLeft: '5%' }}
          src={getFileCloudId(imgKey)}
        />
      </View>
      <View>暂无视频</View>
    </PageContainer>
  );
};
