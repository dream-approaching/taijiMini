import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';
import CommonTitle from '@src/components/commonTitle';

export default class extends Component {
  handlePreviewImg = () => {
    Taro.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['cloud://dev-vza4u.6465-dev-vza4u-1302956475/83/baiheliangchi/180224.jpg'], // 需要预览的图片http链接列表
    });
  };
  render() {
    return (
      <View className='page'>
        <CommonTitle title='白鹤亮翅' />
        <Image
          onClick={this.handlePreviewImg}
          mode='aspectFit'
          lazyLoad
          // showMenuByLongpress
          style='width: 300px;'
          src='cloud://dev-vza4u.6465-dev-vza4u-1302956475/83/baiheliangchi/180224.jpg'
        />
      </View>
    );
  }
}
