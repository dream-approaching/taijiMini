import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import TimelineList from '@src/components/TimelineList';
import PageContainer from '@src/components/PageContainer';

export default class ViewPage extends Component {
  render() {
    return (
      <PageContainer>
        <View>
          <View style={{ height: 20 }} />
          <TimelineList
            title='丹田鼓荡'
            items={[
              { title: '吸气：收腹、提肛、脚趾抓地、涌泉穴空' },
              { title: '呼气：丹田前鼓、命门后撑、肛门放松、脚趾放松、气灌涌泉' },
              { title: '呼吸要求：深 细 匀 长' },
            ]}
          />
          <TimelineList
            title='丹田内旋'
            items={[
              { title: '平圆旋转：顺时针(前右后左)' },
              { title: '平圆旋转：逆时针(前左后右)' },
              { title: '侧立圆旋转：顺时针(上右下左)' },
              { title: '侧立圆旋转：逆时针(上左下右)' },
              { title: '正立圆旋转：顺时针(前下后上)' },
              { title: '正立圆旋转：逆时针(前上后下)' },
              { title: '立体 360 度顺逆方向任意旋转' },
            ]}
          />
          <TimelineList
            title='胸腰折叠'
            items={[
              { title: '方向：挺腹 => 挺胸 => 挺背 => 撑命门' },
              { title: '手随身体动，可往前或往后' },
            ]}
          />
          <TimelineList
            title='提臀翻臀'
            items={[
              { title: '沉左臀 翻右臀' },
              { title: '沉右臀 翻左臀' },
              { title: '丹田走螺旋睡 8 字' },
            ]}
          />
        </View>
      </PageContainer>
    );
  }
}
