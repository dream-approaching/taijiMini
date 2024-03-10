import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Image, Navigator, Button, Ad, AdCustom } from '@tarojs/components';
import logoImg from '@src/assets/images/logo.png';
import iconBasic from '@src/assets/images/icon-list-basic.png';
import iconView from '@src/assets/images/icon-list-view.png';
import iconAction from '@src/assets/images/icon-list-action.png';
import iconForm from '@src/assets/images/icon-list-form.png';
import iconLayout from '@src/assets/images/icon-list-layout.png';
import iconHoc from '@src/assets/images/icon-list-hoc.png';
import styles from './index.module.less';
import { muchclickEvent } from '@src/utils';
import VersionModal from '@src/components/VersionModal';

interface MyState {
  list: Array<any>;
  version: any;
}
export default class Index extends React.Component<{}, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      version: '1.0.1',
      list: [
        {
          id: 'warnup',
          title: '基本功练习',
          content: '含热身运动、内功心法等基本功练习',
          icon: iconBasic,
        },
        {
          id: 'baduanjin',
          title: '八段锦',
          content: '健身气功八段锦',
          icon: iconView,
        },
        {
          id: 'bafawubu',
          title: '八法五步',
          content: '太极八法五步',
          icon: iconAction,
        },
        {
          id: 'inside',
          title: '内功心法',
          content: '包含丹田的鼓荡、内旋以及胸腰折叠',
          icon: iconForm,
        },
        {
          id: 'eighteen3',
          title: '八十三式',
          content: '陈式太极拳八十三式',
          icon: iconLayout,
        },
        {
          id: 'aboutme',
          title: '关于我',
          content: '关于我',
          icon: iconHoc,
        },
      ],
    };
  }

  imgRef = null;

  async componentDidMount() {
    // 连续点击15下 在本地缓存设置 showVideo 为true
    muchclickEvent(15, this.imgRef, () => {
      const showVideo = Taro.getStorageSync('showVideo');
      if (!showVideo) {
        Taro.setStorageSync('showVideo', true);
      }
    });
    // 读取配置然后放缓存中
    Taro.cloud
      .callFunction({
        name: 'getConfig',
      })
      .then((res) => {
        Taro.setStorageSync('globalConfig', res.result);
      });
  }

  onShareAppMessage() {
    return {
      title: '陈式太极拳学习',
      path: '/pages/index/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '陈式太极拳学习',
      path: '/pages/index/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '陈式太极拳学习',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  handleAppreciate = () => {
    Taro.previewImage({
      urls: ['cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/like.jpg'],
    });
  };

  render() {
    const { list } = this.state;
    return (
      <View className={styles.pageCon}>
        <View className={styles.logo}>
          <Image
            id='test'
            src={logoImg}
            ref={(ref) => (this.imgRef = ref)}
            className={styles.img}
            mode='widthFix'
          />
        </View>
        <View className={styles.listCon}>
          {list.map((item, index) => (
            <Navigator className={styles.listItem} key={index} url={`/pages/${item.id}/index`}>
              <View className={styles.itemIcon}>
                <Image src={item.icon} className={styles.itemImg} mode='widthFix' />
              </View>
              <View className={styles.itemInfo}>
                <View className={styles.title}>{item.title}</View>
                <View className={styles.content}>{item.content}</View>
              </View>
              <View className={styles.itemArrow}>
                <AtIcon value='chevron-right' />
              </View>
            </Navigator>
          ))}
        </View>
        <View className={styles.adCon}>
          <Ad unitId='adunit-d704a0e43a61c45c'></Ad>
        </View>
        <View className='floatAd'>
          <AdCustom unitId='adunit-968d3dcfb9a0a917'></AdCustom>
        </View>
        <View className={styles.footer}>
          <View style={{ flex: 1 }}>
            <VersionModal textClass={styles.footerBtn} />
          </View>
          {/* <Button className={styles.footerBtn} onClick={this.handleAppreciate}>
            赞赏
          </Button> */}
          <Button open-type='contact' className={styles.footerBtn}>
            联系客服
          </Button>
        </View>
        <View className='customBannerAd'>
          <AdCustom unitId='adunit-773d880e23ea93e7'></AdCustom>
        </View>
      </View>
    );
  }
}
