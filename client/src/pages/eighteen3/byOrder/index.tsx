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
          id: '11-13-xiexing2',
          title: '第二斜行 再收 前蹚拗步',
        },
        {
          id: '14-15-yanshouhongchui',
          title: '掩手肱捶 十字手',
        },
        {
          id: '16-jingangdaodui3',
          title: '第三金刚捣碓',
        },
        {
          id: '17-18-bishenchui',
          title: '庇身捶(含背折靠) 青龙出水',
        },
        {
          id: '19-21-shuangtuizhang',
          title: '双推掌 三换掌 肘底捶',
        },
        {
          id: '22-23-daojuangong',
          title: '倒卷肱 退步压肘',
        },
        {
          id: '24-zhongpan',
          title: '中盘',
        },
        {
          id: '25-26-baiheliangchi2',
          title: '白鹤亮翅 斜行',
        },
        {
          id: '27-shantongbei',
          title: '闪通背',
        },
        {
          id: '28-30-yanshouhongchui2',
          title: '掩手肱捶 大六封四闭 单鞭',
        },
        {
          id: '31-32-yunshou',
          title: '运手 高探马',
        },
        {
          id: '33-35-youcajiao',
          title: '右擦脚 左擦脚 转身左蹬脚',
        },
        {
          id: '36-38-qiantangaobu',
          title: '前蹚拗步 击地锤 翻身二起脚',
        },
        {
          id: '39-40-huxinchui',
          title: '护心锤 旋风脚',
        },
        {
          id: '41-43-youdengjiao',
          title: '右蹬脚 海底翻花 掩手肱捶',
        },
        {
          id: '44-xiaoqinda',
          title: '小擒打',
        },
        {
          id: '45-48-baotoutuishan',
          title: '抱头推山 三换掌 六封四闭 单鞭',
        },
        {
          id: '49-52-qianzhaohouzhao',
          title: '前招后招 野马分鬃 大六封四闭 单鞭',
        },
        {
          id: '53-57-shuangzhenjiao',
          title: '双震脚 玉女穿梭 懒扎衣 六封四闭 单鞭',
        },
        {
          id: '58-60-yunshou2',
          title: '运手 双摆莲 跌叉',
        },
        {
          id: '61-jinjiduli',
          title: '左右金鸡独立',
        },
        {
          id: '62-63-daojuangong',
          title: '倒卷肱 退步压肘',
        },
        {
          id: '64-zhongpan',
          title: '中盘',
        },
        {
          id: '65-66-baiheliangchi2',
          title: '白鹤亮翅 斜行',
        },
        {
          id: '67-shantongbei',
          title: '闪通背',
        },
        {
          id: '68-70-yanshouhongchui',
          title: '掩手肱捶 大六封四闭 单鞭',
        },
        {
          id: '71-72-yunshou',
          title: '运手 高探马',
        },
        {
          id: '73-77-shizidanbailian',
          title: '十字单摆莲 指裆锤 白猿献果 六封四闭 单鞭',
        },
        {
          id: '78-81-quedilong',
          title: '雀地龙 上步七星 退步跨虎 转身双摆莲',
        },
        {
          id: '82-83-dangtoupao',
          title: '当头炮 风扫梅花 金刚捣碓 收势',
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
        <View className='customBannerAd'>
          <AdCustom unitId='adunit-773d880e23ea93e7'></AdCustom>
        </View>
      </View>
    );
  }
}
