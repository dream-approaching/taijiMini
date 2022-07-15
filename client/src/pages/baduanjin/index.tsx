import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Navigator } from '@tarojs/components';
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
          id: 'main',
          title: '综述',
          content: '招式说明',
        },
        {
          id: '0104',
          title: '第 01-04 段',
        },
        {
          id: '0508',
          title: '第 05-08 段',
        },
      ],
    };
  }

  onShareAppMessage() {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '健身气功八段锦',
      path: '/pages/baduanjin/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '健身气功八段锦',
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
              url={`/pages/baduanjin/${item.id}/index`}
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
      </View>
    );
  }
}
