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
          id: '0117',
          title: '第 01-17 势',
          content:
            '起势 左掤 右捋 左挤 双按 右採 左挒 左肘 右靠 右掤 左捋 右挤 双按 左採 右挒 右肘 左靠',
        },
        {
          id: '1819',
          title: '第 18-19 势',
          content: '进步左右掤 退步左右捋',
        },
        {
          id: '2023',
          title: '第 20-23 势',
          content: '左移步左挤 左移步双按 右移步右挤 右移步双按',
        },
        {
          id: '2425',
          title: '第 24-25 势',
          content: '退步左右採 进步左右挒',
        },
        {
          id: '2629',
          title: '第 26-29 势',
          content: '右移步右肘 右移步右靠 左移步左肘 左移步左靠',
        },
        {
          id: '3032',
          title: '第 30-32 势',
          content: '中定左右独立 十字手 收势',
        },
      ],
    };
  }

  onShareAppMessage() {
    return {
      title: '太极八法五步',
      path: '/pages/bafawubu/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '太极八法五步',
      path: '/pages/bafawubu/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '太极八法五步',
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
              url={`/pages/bafawubu/${item.id}/index`}
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
