import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import CommonVideo from '@src/components/CommonVideo';
import { getFileCloudId } from '@src/utils';
import styles from './index.module.less';

class ImgItem {
  Key: string;
  ETag: string;
}

interface MyState {
  imgList: Array<ImgItem>;
  videoList: Array<ImgItem>;
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
    console.log('%c zjs fileListRes:', 'color: #0e93e0;background: #aaefe5;', fileListRes);
    const imgList: Array<ImgItem> = [];
    const videoList: Array<ImgItem> = [];
    fileListRes.result.fileList.forEach((item: ImgItem) => {
      const format = item.Key.split('.')[1];
      if (format === 'png' || format === 'jpg') {
        imgList.push(item);
      }
      if (format === 'mp4') {
        videoList.push(item);
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
    console.log('%c zjs videoList:', 'color: #0e93e0;background: #aaefe5;', videoList);
    console.log('%c zjs imgList:', 'color: #0e93e0;background: #aaefe5;', imgList);
    return (
      <View className={styles.page}>
        <CommonTitle title='白鹤亮翅' />
        {imgList.map((item) => {
          return (
            <Image
              key={item.ETag}
              onClick={() => this.handlePreviewImg(getFileCloudId(item.Key))}
              mode='aspectFit'
              lazyLoad
              // showMenuByLongpress
              style='width: 350px;'
              src={getFileCloudId(item.Key)}
            />
          );
        })}
        {videoList.map((item) => {
          return <CommonVideo key={item.ETag} title='分解动作' src={getFileCloudId(item.Key)} />;
        })}
      </View>
    );
  }
}
