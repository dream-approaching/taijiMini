import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.less';

export interface Props {
  title: string;
}

function CommonTitle({ title }: Props) {
  console.log('%c zjs title:', 'color: #0e93e0;background: #aaefe5;', title);
  return <View className={styles.title}>{title}</View>;
}

export default CommonTitle;
