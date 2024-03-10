import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text, Image } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';
import { VideoItem } from '@src/config/common';
import { getFileCloudId } from '@src/utils';
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

    const imgKey = 'warmup/shouxie.jpg';
    const handlePreviewImg = () => {
      Taro.previewImage({
        current: getFileCloudId(imgKey), // 当前显示图片的http链接
        urls: [getFileCloudId(imgKey)], // 需要预览的图片http链接列表
      });
    };
    return (
      <PageContainer videoList={videoList}>
        <View>
          <View className={styles.summary}>
            <Text className={styles.commonText}>每个动作4个八拍</Text>
          </View>
          <TimelineList
            title='颈部运动'
            content='1、左右摆颈 2、左右压颈 3、上下理颈 4、左右旋颈'
          />
          <TimelineList
            title='头部运动(又名七窍运动)'
            content='1、搓手 2、拂面 3、梳头 4、搓耳 5、鸣天鼓 6、压耳 7、按揉迎香穴 8、搓鼻翼 9、左右旋目 10、提压睛明穴 11、叩座牙 12、叩门牙 13、舌左右搅外牙龈 14、舌左右搅内牙龈 15、鼓嗽 16、吞咽唾液 17、按揉大椎穴 18、按揉风池穴 19、按揉太阳穴。'
          />
          <TimelineList
            title='热身运动'
            content='1、左右旋腕旋踝 2、提脚跟屈膝下蹲 3、左右旋膝  4、左右旋胯 5、双臂开胸运动 6、双臂上下拉伸运动 7、前后旋肩运动  8、左右旋腰甩臂 9、左右弓步压胯 10、左右赴步压腿 11、左右跌叉压腿 12、俯身合臂压腿 13、左右屈膝下蹲压腿 14、左右放松蹬脚 15、左右摆腿 16、左右里合摆腿  17、左右正踢腿 18、左右侧踢腿 19、左右正拍脚 20、左右蹬脚 21、二起脚 22、旋风脚 23、双摆莲 24、十字摆莲 25、左右单腿独立升降桩 26、马步开合桩 27、左右铲腿上步 28、定步活步背靠胸靠侧肩靠 29、其它功力速度耐力反应准确度等训练'
          />
          <TimelineList
            title='内功心法'
            content='1、浑元桩 2、丹田鼓荡 3、丹田内旋 4、前后胸腰折叠  5、左右旋腰捋手 6、左右前后上下旋腰抽提 7、胸腰折叠甩臂 8、左右劈掛手 9、左右摆掛掌 10、左右直掛掌 11、左右勾掛掌 12、左右拍掛掌 13、左右砍摆掌 14、左右砍直掌 15、左右砍勾掌 16、左右砍拍掌 17、左右运手掌 18、左右搂推掌 19、左右玉女穿梭 20、开合封手。 '
          />
          <TimelineList content='内功心法4—20可定步习练，也可活步习练，如进退左右移步之字步弹簧步九宫步八卦步转身步等。' />
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
