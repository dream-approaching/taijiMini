import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import PageContainer from '@src/components/PageContainer';
import { VideoItem } from '@src/config/common';

interface MyState {
  videoList: Array<VideoItem>;
}
export default class ViewPage extends Component<{}, MyState> {
  state: MyState = {
    videoList: [],
  };

  async componentDidMount() {
    try {
      Taro.showLoading({ title: '加载中' });
      const fileListRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'getFileList',
        data: {
          path: 'warmup',
        },
      });
      const videoList: Array<VideoItem> = [];
      console.log('%c zjs fileListRes:', 'color: #0e93e0;background: #aaefe5;', fileListRes);
      fileListRes.result.fileList.forEach((item: VideoItem) => {
        const format = item.Key.split('.')[1];
        if (format === 'mp4') {
          videoList[0] = { ...item, title: '集体热身', shotInfo: '郑金寿 2020年06月14日 深圳市' };
        }
      });
      this.setState({
        videoList,
      });
      Taro.hideLoading();
    } catch (error) {
      Taro.hideLoading();
      Taro.showToast({ title: '数据拉取失败，请重新进入页面', icon: 'none' });
      console.log('%c zjs error:', 'color: #0e93e0;background: #aaefe5;', error);
    }
  }

  render() {
    const { videoList } = this.state;
    console.log('%c zjs videoList:', 'color: #0e93e0;background: #aaefe5;', videoList);
    return (
      <PageContainer videoList={videoList}>
        <View>123</View>
      </PageContainer>
    );
  }
}
