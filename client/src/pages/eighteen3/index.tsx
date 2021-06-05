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
          id: 'prepare',
          title: '预备式',
          content: '预备式也为第 1 式。',
        },
        {
          id: 'jingangdaodui2',
          title: '第二金刚捣碓',
          content: '全套共有 4 个金刚捣碓。 此为第 6 式',
        },
        {
          id: 'jingangdaodui3',
          title: '第三金刚捣碓',
          content: '全套共有 4 个金刚捣碓。 此为第 16 式',
        },
        {
          id: 'lanzhayi',
          title: '懒扎衣',
          content: '全套共有 2 个懒扎衣。 分别于第3、55 式',
        },
        {
          id: 'liufengsibi',
          title: '六封四闭',
          content: '全套共有 7 个六封四闭。 分别于第4、29、47、51、56、67、76 式',
        },
        {
          id: 'danbian',
          title: '单鞭',
          content: '全套共有 7 个单鞭。 分别于第5、30、48、52、57、70、77 式',
        },
        {
          id: 'baiheliangchi',
          title: '白鹤亮翅 斜行 初收 前蹚拗步',
          content: '白鹤亮翅 斜行 初收 前蹚拗步',
        },
        {
          id: 'xiexing2',
          title: '第二斜行 再收 前蹚拗步 掩手肱捶 十字手',
          content: '与前面三式相似，只有衔接动作有些不同',
        },
        {
          id: 'zhongpan',
          title: '中盘',
          content: '全套共有 2 个中盘。 分别于第24、64 式',
        },
        {
          id: 'shantongbei',
          title: '闪通背',
          content: '全套共有 2 个闪通背。 分别于第27、67 式',
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
      </View>
    );
  }
}
