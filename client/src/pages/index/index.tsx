import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Image, Navigator } from '@tarojs/components';
import logoImg from '@src/assets/images/logo.png';
import iconBasic from '@src/assets/images/icon-list-basic.png';
import iconView from '@src/assets/images/icon-list-view.png';
import iconAction from '@src/assets/images/icon-list-action.png';
import iconForm from '@src/assets/images/icon-list-form.png';
import iconLayout from '@src/assets/images/icon-list-layout.png';
import styles from './index.module.less';

interface MyState {
  list: Array<any>;
}
export default class Index extends React.Component<{}, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: 'warnup',
          title: '热身运动',
          content: '包含头部、关节、踢腿以及桩功等',
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
      ],
    };
  }

  onLoad = () => {
    const { miniProgram } = Taro.getAccountInfoSync();
    const version = miniProgram.version;
    console.log('%c zjs version:', 'color: #0e93e0;background: #aaefe5;', version);
  };

  onShareAppMessage() {
    return {
      title: '刘师傅太极教学',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg',
    };
  }

  render() {
    const { list } = this.state;
    return (
      <View className={styles.pageCon}>
        <View className={styles.logo}>
          <Image src={logoImg} className={styles.img} mode='widthFix' />
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
      </View>
    );
  }
}
