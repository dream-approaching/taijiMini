import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';

import './app.less';

class App extends Component {
  async componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      const openId = await this.getOpenid();
      console.log('%c zjs openId:', 'color: #0e93e0;background: #aaefe5;', openId);
    }
  }

  openid = '';

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  getCloudOpenid = async () => {
    const cloudFn = async () => {
      const loginRes: Record<string, any> = await Taro.cloud.callFunction({ name: 'login' });
      return loginRes.result.openid;
    };
    return (this.openid = this.openid || (await cloudFn()));
  };

  //最佳方案。
  getOpenid = async () => {
    (this.openid = this.openid || Taro.getStorageSync('openid')) ||
      Taro.setStorageSync('openid', await this.getCloudOpenid());
    return this.openid;
  };

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
