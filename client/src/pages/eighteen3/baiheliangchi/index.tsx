import Taro from '@tarojs/taro';
import React from 'react';
import { getVideoType } from '@src/utils';
import { videoType } from '@src/config/constants';
import PageContainer from '@src/components/PageContainer';
import { imageDataConfig, videoDataConfig } from './dataConfig';

class ImgItem {
  Key: string;
  ETag: string;
  title?: string;
}

class VideoItem {
  Key: string;
  ETag: string;
  title: string;
  shotInfo?: string;
}

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
          path: '83/baiheliangchi',
        },
      });
      const imgList: Array<ImgItem> = [];
      const videoList: Array<VideoItem> = [];
      fileListRes.result.fileList.forEach((item: ImgItem) => {
        const format = item.Key.split('.')[1];
        if (format === 'png' || format === 'jpg') {
          imgList.push(item);
        }
        if (format === 'mp4') {
          const type = getVideoType(item.Key);
          videoList[videoType[type].index] = { ...item, ...videoDataConfig[videoType[type].name] };
        }
      });
      this.setState({
        imgList,
        videoList,
      });
    } catch (error) {
      Taro.showToast({ title: '数据拉取失败，请重新进入页面' });
      console.log('%c zjs error:', 'color: #0e93e0;background: #aaefe5;', error);
    } finally {
      Taro.hideLoading();
    }
  }

  render() {
    const { imgList, videoList } = this.state;
    return (
      <PageContainer imgList={imgList} videoList={videoList} imageDataConfig={imageDataConfig} />
    );
  }
}
