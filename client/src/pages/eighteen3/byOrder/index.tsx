import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Navigator, Text, AdCustom } from '@tarojs/components';
import styles from '../index.module.less';

interface MyState {
  list: Array<any>;
}
export default class Index extends React.Component<{}, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: '01-prepare',
          title: '预备式',
        },
        {
          id: '02-jingangdaodui',
          title: '金刚捣碓',
        },
        {
          id: '03-lanzhayi',
          title: '懒扎衣',
        },
        {
          id: '04-liufengsibi',
          title: '六封四闭',
        },
        {
          id: '05-danbian',
          title: '单鞭',
        },
        {
          id: '06-jingangdaodui2',
          title: '第二金刚捣碓',
        },
        {
          id: '07-10-baiheliangchi',
          title: '白鹤亮翅 斜行 初收 前蹚拗步',
        },
        {
          id: '11-15-xiexing2',
          title: '第二斜行 再收 前蹚拗步 掩手肱捶 十字手',
        },
        {
          id: '16-jingangdaodui3',
          title: '第三金刚捣碓',
        },
        {
          id: '17-bishenchui',
          title: '庇身捶(含背折靠)',
        },
        {
          id: '18-qinglongchushui',
          title: '青龙出水',
        },
        {
          id: '19-shuangtuizhang',
          title: '双推掌',
        },
        {
          id: '20-sanhuanzhang',
          title: '三换掌',
        },
        {
          id: '21-zhoudichui',
          title: '肘底捶',
        },
        {
          id: '22-daojuanhong',
          title: '倒卷肱',
        },
        {
          id: '23-tuibuyazhou',
          title: '退步压肘',
        },
        {
          id: '24-zhongpan',
          title: '中盘',
        },
        {
          id: '27-shantongbei',
          title: '闪通背',
        },
        {
          id: '30-danbian',
          title: '单鞭',
        },
        {
          id: '48-danbian',
          title: '单鞭',
        },
        {
          id: '52-danbian',
          title: '单鞭',
        },
        {
          id: '57-danbian',
          title: '单鞭',
        },
        {
          id: '70-danbian',
          title: '单鞭',
        },
        {
          id: '77-danbian',
          title: '单鞭',
        },
        {
          id: '67-shantongbei',
          title: '闪通背',
        },
      ],
    };
  }

  onShareAppMessage() {
    return {
      title: '陈式太极拳 八十三式',
      path: '/pages/eighteen3/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '陈式太极拳 八十三式',
      path: '/pages/eighteen3/index',
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
          {list.map((item, index) => {
            const arr = item.id.split('-');
            console.log('%c zjs arr:', 'color: #fff;background: #b457ff;', arr);
            const titleIndex = arr.length > 2 ? `${arr[0]}-${arr[1]}` : arr[0];
            return (
              <Navigator
                className={styles.listItem}
                key={index}
                url={`/pages/eighteen3/byOrder/${item.id}/index`}
              >
                <View className={styles.itemInfo}>
                  <View className={styles.title}>
                    <Text className={styles.title}>第{titleIndex}式</Text>
                    <Text className={styles.contentOrder}>{item.title}</Text>
                  </View>
                </View>
                <View className={styles.itemArrow}>
                  <AtIcon value='chevron-right' />
                </View>
              </Navigator>
            );
          })}
        </View>
        <View className='floatAd'>
          <AdCustom unitId='adunit-77d5696732c26384'></AdCustom>
        </View>
      </View>
    );
  }
}
