import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';

export default class DocsHeader extends Component {
  render() {
    const { title, desc } = this.props;

    return (
      <View className='doc-header'>
        <View className='doc-header__title'>{title}</View>
        <View className='doc-header__desc'>{desc}</View>
      </View>
    );
  }
}

DocsHeader.defaultProps = {
  title: '标题',
  desc: '',
};
