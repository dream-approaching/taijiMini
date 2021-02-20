import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';

export default class ViewPage extends Component {
  render() {
    return (
      <View className='page'>
        <CommonTitle title={123} />
      </View>
    );
  }
}
