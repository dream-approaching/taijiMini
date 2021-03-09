import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import CommonVideo from '@src/components/CommonVideo';
import { getFileCloudId, getVideoType } from '@src/utils';
import { videoType } from '@src/config/constants';
import styles from './index.module.less';
import { videoDataConfig } from './dataConfig';

class ImgItem {
  Key: string;
  ETag: string;
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
  }

  handlePreviewImg = (currentImg) => {
    const { imgList } = this.state;
    Taro.previewImage({
      current: currentImg, // 当前显示图片的http链接
      urls: imgList.map((item) => getFileCloudId(item.Key)), // 需要预览的图片http链接列表
    });
  };

  render() {
    const { imgList, videoList } = this.state;
    return (
      <View className={styles.page}>
        <CommonTitle level={1} title='视频描述' />
        {videoList.map((item) => {
          return (
            <View className={styles.videoCon} key={item.ETag}>
              <CommonVideo
                title={item.title}
                shotInfo={item.shotInfo}
                src={getFileCloudId(item.Key)}
              />
            </View>
          );
        })}
        <CommonTitle level={1} title='图文描述' />
        <View className={styles.imgCon}>
          {imgList.map((item) => {
            return (
              <Image
                key={item.ETag}
                onClick={() => this.handlePreviewImg(getFileCloudId(item.Key))}
                mode='widthFix'
                lazyLoad
                className={styles.img}
                src={getFileCloudId(item.Key)}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
