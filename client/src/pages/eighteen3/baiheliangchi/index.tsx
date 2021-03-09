import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import CommonVideo from '@src/components/CommonVideo';
import { getFileCloudId, lastArr } from '@src/utils';
import { videoType } from '@src/config/constants';
import styles from './index.module.less';

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
        const fileName = lastArr(item.Key.split('/'));
        const type = fileName.split('.')[0].split('_')[1];
        let title = '';
        let shotInfo = '';
        let index = 0;
        switch (type) {
          case videoType.attack:
            title = '攻防含义';
            shotInfo = '吴少华 2019年11月25日 娄底市';
            index = 3;
            break;
          case videoType.detail:
            title = '动作要领';
            shotInfo = '吴少华 2019年11月25日 娄底市';
            index = 2;
            break;
          case videoType.number:
            title = '分解动作';
            shotInfo = '吴少华 2019年11月25日 娄底市';
            index = 1;
            break;
          default:
            // normal
            title = '正常';
            shotInfo = '吴少华 2019年11月25日 娄底市';
            index = 0;
            break;
        }
        videoList[index] = { ...item, title, shotInfo };
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
      </View>
    );
  }
}
