import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';

import './app.less';

class App extends Component {
  async componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
      // const openId = await this.getOpenid();
      await this.getUserInfo();
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

  getUserInfo = async (callback?) => {
    const userInStorage = Taro.getStorageSync('userInfo');
    const failFn = () => {
      wx.showToast({ title: '获取信息失败', icon: 'error' });
    };
    if (!userInStorage) {
      return new Promise((resolve, reject) => {
        Taro.showModal({
          title: '授权提示',
          content: '需要获取您的基本信息，用于完善用户资料，请点击“确认”后按操作提示授权',
          success: (res) => {
            if (res.confirm) {
              wx.getUserProfile({
                desc: '用于完善用户资料',
                success: (res) => {
                  Taro.setStorageSync('userInfo', res.userInfo);
                  callback && callback(res.userInfo);
                  resolve(res.userInfo);
                },
                fail: () => {
                  failFn();
                  reject(null);
                },
              });
            } else if (res.cancel) {
              failFn();
              reject(null);
            }
          },
        });
      });
    }
    return userInStorage;
  };

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
