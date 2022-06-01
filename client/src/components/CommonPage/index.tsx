import Taro from '@tarojs/taro';
import React from 'react';
import { getVideoType } from '@src/utils';
import { videoType } from '@src/config/constants';
import PageContainer from '@src/components/PageContainer';
import { ImgItem, VideoItem } from '@src/config/common';

interface MyState {
  imgList: Array<ImgItem>;
  videoList: Array<VideoItem>;
}
interface MyProps {
  path: string;
  imageDataConfig: object;
  videoDataConfig: object;
  videoCustom?: boolean;
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
    const { path, imageDataConfig, videoDataConfig, videoCustom } = this.props;
    try {
      Taro.showLoading({ title: '加载中' });
      const fileListRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'getFileList',
        data: { path },
      });
      const imgList: Array<ImgItem> = [];
      const videoList: Array<VideoItem> = [];
      fileListRes.result.fileList.forEach((item: ImgItem) => {
        const [keyPath, format] = item.Key.split('.');
        if (format === 'png' || format === 'jpg') {
          const keyArr = Object.keys(imageDataConfig);
          fileListRes.result.fileList.map((item) => {
            if (keyArr.indexOf(item.Key) > -1) {
              const index = keyArr.findIndex((keyItem) => item.Key === keyItem);
              imgList[index] = {
                ...item,
                desc: `${index + 1}、${imageDataConfig[item.Key].title}`,
              };
            }
          });
        }
        if (format === 'mp4') {
          const type = getVideoType(item.Key);
          console.log('%c zjs videoCustom:', 'color: #fff;background: #b457ff;', videoCustom);
          if (videoCustom) {
            const [paths, name] = keyPath.split('/');
            console.log('%c zjs keyPath:', 'color: #fff;background: #b457ff;', keyPath);
            videoList.push({ ...item, ...videoDataConfig[name] });
          } else {
            videoList[videoType[type].index] = {
              ...item,
              ...videoDataConfig[videoType[type].name],
            };
          }
        }
      });
      this.setState({
        imgList,
        videoList,
      });
      Taro.hideLoading();
    } catch (error) {
      if (this.tryTimes >= 5) {
        Taro.hideLoading();
        Taro.showToast({ title: '数据拉取失败，请重新进入页面', icon: 'none' });
      } else {
        console.log('%c zjs error:', 'color: #0e93e0;background: #aaefe5;', error);
        this.tryTimes += 1;
        this.getData();
      }
    }
  };

  render() {
    const { imgList, videoList } = this.state;
    return <PageContainer imgList={imgList} videoList={videoList} />;
  }
}
