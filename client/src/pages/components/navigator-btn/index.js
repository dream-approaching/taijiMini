import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View } from '@tarojs/components';

export default class NavigatorBtn extends Component {
  handleGoto(parent, name) {
    Taro.navigateTo({
      url: `/pages/${parent.toLowerCase()}/${name.toLowerCase()}/index`,
    });
  }

  render() {
    const { parent, name } = this.props;

    return (
      <View className='demo-goto-btn' onClick={this.handleGoto.bind(this, parent, name)}>
        查看详情
      </View>
    );
  }
}

NavigatorBtn.defaultProps = {
  parent: '',
  name: '',
};
