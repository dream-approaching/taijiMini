import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';
import { VideoItem } from '@src/config/common';
import styles from './index.module.less';

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
          path: 'warmup',
        },
      });
      const videoList: Array<VideoItem> = [];
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

  onShareAppMessage() {
    return {
      title: '热身运动',
      path: '/pages/warnup/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '热身运动',
      path: '/pages/warnup/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '热身运动',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  render() {
    const { videoList } = this.state;
    return (
      <PageContainer videoList={videoList}>
        <View>
          <View className={styles.summary}>
            <Text className={styles.commonText}>每个动作4个八拍</Text>
          </View>
          <TimelineList
            title='头部七窍'
            items={[
              { title: '摆颈' },
              { title: '压颈' },
              { title: '理颈' },
              { title: '旋颈' },
              { title: '手搓热敷面（冬天可以做一做）' },
              { title: '搓耳朵（捂住耳朵来回搓）' },
              { title: '鸣天鼓（捂住耳朵用手指敲后脑勺）' },
              { title: '挠头（类似梳头，按摩头皮）' },
              { title: '旋目（转眼睛）' },
              { title: '抚摸鼻梁' },
              { title: '搅舌（搅内外牙龈）' },
              { title: '嗑齿（嗑坐牙和门牙各 100 次）' },
              { title: '鼓漱（产生唾液慢慢咽下去，可以杀菌、助消化）' },
            ]}
          />
          <TimelineList
            title='关节热身'
            items={[
              { title: '手腕脚踝' },
              { title: '下蹲运动' },
              { title: '膝盖（绕圈）' },
              { title: '胯部运动' },
              { title: '扩胸运动' },
              { title: '上下甩臂' },
              { title: '肩部运动（前后）' },
              { title: '转腰甩臂（左右）' },
              { title: '压腿运动（弓步、扑步、扑步勾脚）' },
              { title: '屈蹲（左右）' },
              { title: '膝盖（绕圈）' },
              { title: '蹬腿' },
              { title: '数指' },
            ]}
          />
          <TimelineList
            title='丹田练习'
            items={[
              { title: '顺逆胸腰折叠' },
              { title: '左右旋腰' },
              { title: '双臂缠绕' },
              { title: '劈挂/甩臂' },
              { title: '甩手（类似甩毛巾）' },
            ]}
          />
          <TimelineList
            title='踢腿热身'
            items={[
              { title: '正踢腿' },
              { title: '侧踢腿' },
              { title: '单摆腿' },
              { title: '里合腿' },
              { title: '正拍腿' },
            ]}
          />
          <TimelineList
            title='桩功'
            items={[{ title: '浑圆桩' }, { title: '开合桩' }, { title: '升降桩' }]}
          />
        </View>
      </PageContainer>
    );
  }
}
