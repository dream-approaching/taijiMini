import Taro from '@tarojs/taro';
import React from 'react';
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import CommonVideo from '@src/components/CommonVideo';
import { getFileCloudId } from '@src/utils';
import styles from './index.module.less';

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

interface PropsType {
  imgList: Array<ImgItem>;
  videoList: Array<VideoItem>;
  imageDataConfig: object;
}
interface MyState {
  currentTab: number;
  showData: boolean;
}
export default class extends React.Component<PropsType, MyState> {
  state: MyState = {
    currentTab: 0,
    showData: false,
  };

  userInfo: any = null;

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    this.setState({ showData: Taro.getStorageSync('userInfo') });
  }

  handlePreviewImg = (currentImg) => {
    const { imgList } = this.props;
    Taro.previewImage({
      current: currentImg, // 当前显示图片的http链接
      urls: imgList.map((item) => getFileCloudId(item.Key)), // 需要预览的图片http链接列表
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
    const { currentTab, showData } = this.state;
    const { imgList, videoList, imageDataConfig } = this.props;
    const tabList = [{ title: '图文描述' }, { title: '视频描述' }];
    return (
      <View className={styles.page}>
        {showData ? (
          <AtTabs
            className={styles.tabs}
            current={currentTab}
            tabList={tabList}
            onClick={this.handleToggleTab}
          >
            <AtTabsPane current={currentTab} index={0}>
              <ScrollView scroll-y className={styles.orderList} lowerThreshold={200}>
                <View className={styles.imgCon}>
                  {imgList.map((item, index) => {
                    return (
                      <View key={item.ETag}>
                        <View className={styles.imgTitle}>
                          <Text className={styles.titleText}>{`${index + 1}、${
                            imageDataConfig[item.Key].title
                          }`}</Text>
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
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={currentTab} index={1}>
              <ScrollView scroll-y className={styles.orderList} lowerThreshold={200}>
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
