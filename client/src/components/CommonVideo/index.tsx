import Taro from '@tarojs/taro';
import React, { Fragment } from 'react';
import { View, Video, Text } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';
import styles from './index.module.less';

type MyProps = {
  src: string;
  title: string;
  shotInfo?: string;
  speed?: number;
  eTag: string;
};

export default class extends React.Component<MyProps, {}> {
  videoRef: any;
  videoContext: any;
  componentDidMount() {
    this.videoContext = Taro.createVideoContext(this.props.eTag, this.videoRef);
    this.setVideoSpeed();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.speed !== this.props.speed) {
      this.setVideoSpeed();
    }
  }

  setVideoSpeed = () => {
    this.videoContext.playbackRate(this.props.speed);
  };

  render() {
    const { src, title, shotInfo, eTag } = this.props;

    return (
      <Fragment>
        <CommonTitle title={title} />
        <View className={styles.videoCon}>
          <Video
            ref={(ref) => (this.videoRef = ref)}
            enablePlayGesture
            src={src}
            controls
            onLoadedMetaData={this.setVideoSpeed}
            autoplay={false}
            loop={false}
            muted={false}
            id={eTag}
          />
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
