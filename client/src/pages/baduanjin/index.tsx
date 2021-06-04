import Taro from '@tarojs/taro';
import React from 'react';
import { getVideoType } from '@src/utils';
import { videoType } from '@src/config/constants';
import PageContainer from '@src/components/PageContainer';
import { imageDataConfig, videoDataConfig } from './dataConfig';
import { ImgItem, VideoItem } from '@src/config/common';

interface MyState {
  imgList: Array<ImgItem>;
  videoList: Array<VideoItem>;
}
export default class extends React.Component<{}, MyState> {
  state: MyState = {
    imgList: [],
    videoList: [],
  };

  async componentDidMount() {
    try {
      Taro.showLoading({ title: '加载中' });
      const fileListRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'getFileList',
        data: {
          path: 'baduanjin',
        },
      });
      const imgList: Array<ImgItem> = [];
      const videoList: Array<VideoItem> = [];
      fileListRes.result.fileList.forEach((item: ImgItem) => {
        const [path, format] = item.Key.split('.');
        if (format === 'png' || format === 'jpg') {
          imgList.push(item);
        }
        if (format === 'mp4') {
          const [paths, name] = path.split('/');
          videoList.push({ ...item, ...videoDataConfig[name] });
        }
      });
      this.setState({
        imgList,
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
    const { imgList, videoList } = this.state;
    return (
      <PageContainer imgList={imgList} videoList={videoList} imageDataConfig={imageDataConfig} />
    );
  }
}
