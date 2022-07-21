import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import PageContainer from '@src/components/PageContainer';

export default class ViewPage extends Component {
  render() {
    return (
      <PageContainer>
        <View>敬请期待</View>
        <View>暂无视频</View>
      </PageContainer>
    );
  }
}
