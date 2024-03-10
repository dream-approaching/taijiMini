import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { AtTimeline } from 'taro-ui';
import CommonTitle from '@src/components/commonTitle';
import styles from './index.module.less';
import { Item } from 'taro-ui/types/timeline';

interface MyProps {
  title?: string;
  items?: Array<Item>;
  content?: string;
}

export default class TimelineList extends Component<MyProps, {}> {
  render() {
    const { title, items, content } = this.props;
    return (
      <View className={styles.timelineCon}>
        {title && <CommonTitle title={title} level={1} />}
        {(items && <AtTimeline className={styles.timeline} items={items} />) || (
          <Text className={styles.contentStyle}>{content}</Text>
        )}
      </View>
    );
  }
}
