import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import 'taro-ui/dist/style/index.scss';

import './app.less';

class App extends Component {
  async componentDidMount() {
    wx.globalData = {
      videoSpeed: 1,
    };
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      const openId = await this.getOpenid();
      this.checkUpdate();
    }
  }

  openid = '';

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  checkUpdate = () => {
    // 检查更新
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function (res) {
      console.log('%cres326:', 'color: #0e93e0;background: #aaefe5;', res);
      // 新的版本下载失败
    });
  };

  getCloudOpenid = async () => {
    const cloudFn = async () => {
      const loginRes: Record<string, any> = await Taro.cloud.callFunction({
        name: 'login',
      });
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
