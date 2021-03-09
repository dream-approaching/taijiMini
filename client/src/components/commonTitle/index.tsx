import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.less';

export interface Props {
  title: string;
}

function CommonTitle({ title }: Props) {
  return <View className={styles.title}>{title}</View>;
}

export default CommonTitle;
