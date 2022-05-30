import Taro from '@tarojs/taro';
import React, { Fragment } from 'react';
import { AtTabs, AtTabsPane, AtButton, AtFab } from 'taro-ui';
import { View, Image, Text, ScrollView, Picker } from '@tarojs/components';
import CommonVideo from '@src/components/CommonVideo';
import { getFileCloudId } from '@src/utils';
import styles from './index.module.less';
import { ImgItem, VideoItem } from '@src/config/common';

interface PropsType {
  imgList?: Array<ImgItem>;
  videoList?: Array<VideoItem>;
  imageDataConfig?: object;
  children?: any;
}
interface MyState {
  currentTab: number;
  showData: boolean;
  globalHide: boolean;
  videoShow: boolean;
  speedArr: number[];
  selectorSpeed?: number;
}
export default class extends React.Component<PropsType, MyState> {
  state: MyState = {
    currentTab: 0,
    showData: false,
    globalHide: false,
    videoShow: false,
    speedArr: [0.5, 0.8, 1.0, 1.25, 1.5],
    selectorSpeed: 1.0,
  };

  userInfo: any = null;

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.setState({ showData: Taro.getStorageSync('userInfo') });
    await this.getVideoShow();
  }

  onChangeSpeed = (e) => {
    this.setState({
      selectorSpeed: this.state.speedArr[e.detail.value],
    });
  };

  getVideoShow = async () => {
    try {
      const res: Record<string, any> = await Taro.cloud.callFunction({ name: 'getVideoShow' });
      const { globalHide, videoShow } = res.result.data;
      this.setState({
        globalHide,
        videoShow,
      });
    } catch (error) {
      console.log('%c zjs error:', 'color: #0e93e0;background: #aaefe5;', error);
    }
  };

  handlePreviewImg = (currentImg) => {
    const { imgList } = this.props;
    Taro.previewImage({
      current: currentImg, // 当前显示图片的http链接
      urls: imgList?.map((item) => getFileCloudId(item.Key)) || [], // 需要预览的图片http链接列表
    });
  };

  handleToggleTab = (value) => {
    this.setState({
      currentTab: value,
    });
  };

  handleGetUserInfo = () => {
    const { getUserInfo } = Taro.getApp().$app;
    getUserInfo(() => {
      this.setState({
        showData: true,
      });
    });
  };

  render() {
    const { currentTab, showData, globalHide, videoShow, speedArr, selectorSpeed } = this.state;
    const { imgList, videoList, children } = this.props;
    const tabList = [{ title: '图文描述' }, { title: '视频描述' }];
    const localShow = Taro.getStorageSync('showVideo'); // 本地缓存是否允许显示
    // 审核时候 videoShow 需要改成 false，此时如果缓存中 showVideo 为 true 时也是会显示的
    // globalHide 值一般不做修改，除非特殊情况，比如被举报了，改为 true 时，视频全部隐藏
    const showVideo = !globalHide && (localShow || videoShow);
    return (
      <View className={styles.page}>
        {showData ? (
          <AtTabs
            className={`${styles.tabs} ${!showVideo ? styles.tabHide : ''}`}
            current={currentTab}
            tabList={tabList}
            onClick={this.handleToggleTab}
          >
            <AtTabsPane current={currentTab} index={0}>
              <ScrollView
                scroll-y
                className={`${styles.orderList} ${!showVideo ? styles.withoutTop : ''}`}
                lowerThreshold={200}
              >
                {(children && children[0]) || children || (
                  <View className={styles.imgCon}>
                    {imgList?.map((item) => {
                      return (
                        <View key={item.ETag}>
                          <View className={styles.imgTitle}>
                            <Text className={styles.titleText}>{item.desc}</Text>
                          </View>
                          <Image
                            onClick={() => this.handlePreviewImg(getFileCloudId(item.Key))}
                            mode='widthFix'
                            lazyLoad
                            className={styles.img}
                            src={getFileCloudId(item.Key)}
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={currentTab} index={1}>
              <ScrollView
                scroll-y
                className={`${styles.orderList} ${!showVideo ? 'withoutTop' : ''}`}
                lowerThreshold={200}
              >
                <Picker
                  mode='selector'
                  className={styles.pickerClass}
                  range={speedArr}
                  onChange={this.onChangeSpeed}
                >
                  <AtFab className={styles.text}>
                    倍速 <br />
                    {selectorSpeed}x
                  </AtFab>
                </Picker>
                {(children && children[1]) || (
                  <Fragment>
                    {videoList?.map((item) => {
                      return (
                        <View className={styles.videoCon} key={item.ETag}>
                          <CommonVideo
                            speed={selectorSpeed}
                            eTag={item.ETag}
                            title={item.title}
                            shotInfo={item.shotInfo}
                            src={getFileCloudId(item.Key)}
                          />
                        </View>
                      );
                    })}
                  </Fragment>
                )}
              </ScrollView>
            </AtTabsPane>
          </AtTabs>
        ) : (
          <AtButton className={styles.authBtn} onClick={this.handleGetUserInfo} type='secondary'>
            授权获取基本信息
          </AtButton>
        )}
      </View>
    );
  }
}
