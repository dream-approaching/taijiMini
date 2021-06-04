import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtTimeline } from 'taro-ui';
import CommonTitle from '@src/components/commonTitle';
import styles from './index.module.less';
import { Item } from 'taro-ui/types/timeline';

interface MyProps {
  title?: string;
  items: Array<Item>;
}

export default class TimelineList extends Component<MyProps, {}> {
  render() {
    const { title, items } = this.props;
    console.log('%c zjs items:', 'color: #0e93e0;background: #aaefe5;', items);
    return (
      <View className={styles.timelineCon}>
        {title && <CommonTitle title={title} />}
        <AtTimeline className={styles.timeline} items={items} />
      </View>
    );
  }
}
