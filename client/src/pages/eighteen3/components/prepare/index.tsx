import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';
import CommonPage from '@src/components/CommonPage';
import { videoAdId } from '../../index.config';

export default class ViewPage extends Component {
  onShareAppMessage() {
    return {
      title: '陈式太极拳 八十三式',
      path: 'pages/eighteen3/byOrder/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '陈式太极拳 八十三式',
      path: 'pages/eighteen3/byOrder/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '陈式太极拳 八十三式',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }
  render() {
    return (
      <CommonPage
        path='83/prepare'
        render={({ videoList }) => {
          return (
            <PageContainer videoList={videoList} videoAdId={videoAdId}>
              <View>
                <View style={{ height: 20 }} />
                <TimelineList
                  title='动作要点'
                  items={[
                    { title: '从头到脚检查一遍' },
                    { title: '入静放松，意念集中，意守丹田，气沉丹田' },
                    { title: '百会穴轻轻领起' },
                    { title: '两眼平视，唇齿轻合，舌抵上腭，下颌微收' },
                    { title: '项自然竖直' },
                    { title: '松肩坠肘' },
                    { title: '两肘微往外掤，微往前卷，腋下要空' },
                    { title: '十个指肚轻轻贴在大腿外侧，虎口圆，掌心空' },
                    { title: '松腰松胯，松膝松踝' },
                    { title: '十个脚趾轻轻抓地' },
                  ]}
                />
              </View>
            </PageContainer>
          );
        }}
      />
    );
  }
}
