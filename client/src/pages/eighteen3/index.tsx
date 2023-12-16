import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Navigator, Ad, AdCustom } from '@tarojs/components';
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
          id: 'byOrder',
          title: '按顺序查看',
          content: '从第1式到83式，按顺序查看',
        },
        {
          id: 'byAction',
          title: '按招式查看',
          content: '83式中有若干重复的动作，此为合并重复招式的入口',
        },
      ],
    };
  }

  onShareAppMessage() {
    return {
      title: '陈式太极拳 八十三式',
      path: 'pages/eighteen3/byOrder/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '陈式太极拳 八十三式',
      path: 'pages/eighteen3/byOrder/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '陈式太极拳 八十三式',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  render() {
    const { list } = this.state;
    return (
      <View className={styles.pageCon}>
        <View className={styles.listCon}>
          {list.map((item, index) => (
            <Navigator
              className={styles.listItem}
              key={index}
              url={`/pages/eighteen3/${item.id}/index`}
            >
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
          <Ad unitId='adunit-2090863cf2e43f4c'></Ad>
        </View>
        <View className='floatAd'>
          <AdCustom unitId='adunit-77d5696732c26384'></AdCustom>
        </View>
      </View>
    );
  }
}
