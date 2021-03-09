import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.less';

export interface Props {
  title: string;
  level?: number;
}

function CommonTitle({ title, level = 2 }: Props) {
  return <View className={styles[`title${level}`]}>{title}</View>;
}

export default CommonTitle;
