import React from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Navigator, AdCustom } from '@tarojs/components';
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
          id: 'prepare',
          title: '预备式',
          content: '预备式也为第 1 式。',
        },
        {
          id: 'jingangdaodui',
          title: '金刚捣碓',
          content: '全套共有 4 个金刚捣碓。 此为第 2 式',
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
          content: '全套共有 7 个六封四闭。 分别于第4、29、47、51、56、69、76 式',
        },
        {
          id: 'danbian',
          title: '单鞭',
          content: '全套共有 7 个单鞭。 分别于第5、30、48、52、57、70、77 式',
        },
        {
          id: 'baiheliangchi',
          title: '白鹤亮翅 斜行 初收 前蹚拗步',
          content: '第 7、8、9、10 式。前蹚拗步重复于第 13、36 式',
        },
        {
          id: 'xiexing2',
          title: '第二斜行 再收 前蹚拗步',
          content: '第 11、12、13 式，与前面三式相似，只有衔接动作有些不同',
        },
        {
          id: 'yanshouhongchui',
          title: '掩手肱捶 十字手',
          content: '第 14、15 式。掩手肱捶重复于28、43、68式。',
        },
        {
          id: 'bishenchui',
          title: '庇身捶(含背折靠) 青龙出水',
          content: '第 17、18 式',
        },
        {
          id: 'shuangtuizhang',
          title: '双推掌 三换掌 肘底锤',
          content: '第 19、20、21 式。三换掌重复于 46 式。',
        },
        {
          id: 'daojuangong',
          title: '倒卷肱 退步压肘',
          content: '全套共有 2 处。分别于 22、23式和62、63式',
        },
        {
          id: 'baiheliangchi2',
          title: '白鹤亮翅 斜行',
          content: '全套共有 2 处。分别于 25、26式和65、66式',
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
        {
          id: 'yunshou',
          title: '运手 高探马',
          content: '第 31、32 式。运手与 58、71 式重复。高探马与 72 式重复。',
        },
        {
          id: 'youcajiao',
          title: '右擦脚 左擦脚 转身左蹬脚',
          content: '第 33、34、35 式',
        },
        {
          id: 'qiantangaobu',
          title: '击地锤 翻身二起脚',
          content: '第 37、38 式',
        },
        {
          id: 'huxinchui',
          title: '护心锤 旋风脚',
          content: '第 39、40 式',
        },
        {
          id: 'youdengjiao',
          title: '右蹬脚 海底翻花',
          content: '第 41、42 式',
        },
        {
          id: 'xiaoqinda',
          title: '小擒打',
          content: '第 44 式',
        },
        {
          id: 'baotoutuishan',
          title: '抱头推山',
          content: '第 45 式',
        },
        {
          id: 'qianzhaohouzhao',
          title: '前招后招 野马分鬃',
          content: '第 49、50 式',
        },
        {
          id: 'shuangzhenjiao',
          title: '双震脚 玉女穿梭',
          content: '第 53、54 式',
        },
        {
          id: 'yunshou2',
          title: '双摆莲 跌叉',
          content: '第 59、60 式',
        },
        {
          id: 'jinjiduli',
          title: '左右金鸡独立',
          content: '第 61 式',
        },
        {
          id: 'shizidanbailian',
          title: '十字单摆莲 指裆锤 白猿献果',
          content: '第 73、74、75 式',
        },
        {
          id: 'quedilong',
          title: '雀地龙 上步七星 退步跨虎 转身双摆莲',
          content: '第 78、79、80、81 式',
        },
        {
          id: 'dangtoupao',
          title: '当头炮 风扫梅花',
          content: '第 82 式当头炮。风扫梅花是新增的一式，不在原83式中。',
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
          {list.map((item, index) => (
            <Navigator
              className={styles.listItem}
              key={index}
              url={`/pages/eighteen3/byAction/${item.id}/index`}
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
        <View className='floatAd'>
          <AdCustom unitId='adunit-77d5696732c26384'></AdCustom>
        </View>
      </View>
    );
  }
}
