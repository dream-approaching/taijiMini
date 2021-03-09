import Taro from '@tarojs/taro';
import React, { Fragment } from 'react';
import { View, Video, Text } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import styles from './index.module.less';

type MyProps = {
  src: string;
  title: string;
  shotInfo?: string;
};

export default class extends React.Component<MyProps, {}> {
  render() {
    const { src, title, shotInfo } = this.props;

    return (
      <Fragment>
        <CommonTitle title={title} />
        <View className={styles.videoCon}>
          <Video src={src} controls autoplay={false} loop={false} muted={false} />
          {shotInfo && (
            <View className={styles.videoBottomTip}>
              <Text className={styles.tipText}>拍摄: {shotInfo}</Text>
            </View>
          )}
        </View>
      </Fragment>
    );
  }
}
