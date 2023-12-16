import Taro from '@tarojs/taro';
import React from 'react';
import PageContainer from '@src/components/PageContainer';
import { ImgItem, VideoItem } from '@src/config/common';
import { View } from '@tarojs/components';

interface MyState {
  imgList: Array<ImgItem>;
  videoList: Array<VideoItem>;
}
interface MyProps {
  path: string;
  render?: any;
  videoAdId?: string;
}
export default class extends React.Component<MyProps, MyState> {
  state: MyState = {
    imgList: [],
    videoList: [],
  };

  tryTimes = 0;

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { path } = this.props;
    try {
      Taro.showLoading({ title: '加载中' });
      const fileListRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'getFileList',
        data: { path },
      });
      this.setState({
        imgList: fileListRes.result.imgList,
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

  render() {
    const { imgList, videoList } = this.state;
    const { render, videoAdId } = this.props;
    if (render) {
      return <View> {render({ imgList, videoList })}</View>;
    }
    return <PageContainer imgList={imgList} videoList={videoList} videoAdId={videoAdId} />;
  }
}
