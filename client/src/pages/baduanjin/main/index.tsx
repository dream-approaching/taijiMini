import Taro, { useShareAppMessage, useShareTimeline, useAddToFavorites } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';
import { getFileCloudId } from '@src/utils';
import { VideoItem } from '@src/config/common';

interface MyState {
  videoList: Array<VideoItem>;
}
export default class ViewPage extends Component<{}, MyState> {
  state: MyState = {
    videoList: [],
  };

  tryTimes = 0;

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      Taro.showLoading({ title: '加载中' });
      const fileListRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'getFileList',
        data: {
          path: 'baduanjin',
        },
      });
      console.log(
        '%c  fileListRes.result.videoList:',
        'color: #0e93e0;background: #aaefe5;',
        fileListRes.result.videoList
      );
      this.setState({
        videoList: fileListRes.result.videoList,
      });
      Taro.hideLoading();
    } catch (error) {
      if (this.tryTimes >= 5) {
        Taro.hideLoading();
        Taro.showToast({ title: '数据拉取失败，请重新进入页面', icon: 'none' });
      } else {
        console.error('%c error:', 'color: #0e93e0;background: #aaefe5;', error);
        this.tryTimes += 1;
        this.getData();
      }
    }
  };

  onShareAppMessage() {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }
  onShareTimeline() {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }
  onAddToFavorites() {
    return {
      title: '健身气功八段锦',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  render() {
    const imgKey = 'baduanjin/20220714204624.jpg';
    const handlePreviewImg = () => {
      Taro.previewImage({
        current: getFileCloudId(imgKey), // 当前显示图片的http链接
        urls: [getFileCloudId(imgKey)], // 需要预览的图片http链接列表
      });
    };
    const { videoList } = this.state;

    return (
      <PageContainer videoList={videoList}>
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
      </PageContainer>
    );
  }
}
