import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Image } from '@tarojs/components';
import logoImg from '../../assets/images/logo.png';
import iconBasic from '../../assets/images/icon-list-basic.png';
import iconView from '../../assets/images/icon-list-view.png';
import iconAction from '../../assets/images/icon-list-action.png';
import iconForm from '../../assets/images/icon-list-form.png';
import iconLayout from '../../assets/images/icon-list-layout.png';
import styles from './index.module.less';

console.log('%c zjs styles:', 'color: #0e93e0;background: #aaefe5;', styles);
export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: 'Basic',
          title: '热身运动',
          content: '包含头部、关节、踢腿以及桩功等',
          icon: iconBasic,
        },
        {
          id: 'View',
          title: '八段锦',
          content: '健身气功八段锦',
          icon: iconView,
        },
        {
          id: 'Action',
          title: '八法五步',
          content: '太极八法五步',
          icon: iconAction,
        },
        {
          id: 'Form',
          title: '内功心法',
          content: '包含丹田的鼓荡、内旋以及胸腰折叠',
          icon: iconForm,
        },
        {
          id: 'Layout',
          title: '八十三式',
          content: '陈式太极拳八十三式',
          icon: iconLayout,
        },
      ],
    };
  }
  onShareAppMessage() {
    return {
      title: 'Taro UI',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg',
    };
  }

  gotoPanel = (e) => {
    const { id } = e.currentTarget.dataset;
    Taro.navigateTo({
      // url: `/pages/panel/index?id=${id.toLowerCase()}`
      url: `/pages/${id.toLowerCase()}/index`,
    });
  };

  render() {
    const { list } = this.state;
    return (
      <View className={styles.pageCon}>
        <View className={styles.logo}>
          <Image src={logoImg} className={styles.img} mode='widthFix' />
        </View>
        <View className={styles.listCon}>
          {list.map((item, index) => (
            <View
              className={styles.listItem}
              key={index}
              data-id={item.id}
              data-name={item.title}
              data-list={item.subpages}
              onClick={this.gotoPanel}
            >
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
            </View>
          ))}
        </View>
      </View>
    );
  }
}
