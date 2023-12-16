import Taro, { useDidHide } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent } from 'taro-ui';
import styles from './index.module.less';

export default function VersionTipModal({ textClass }) {
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [version, setVersion] = useState('2.2.2');

  useDidHide(() => {
    setShowVersionModal(false);
  });

  useEffect(() => {
    const { miniProgram } = Taro.getAccountInfoSync();
    const version = miniProgram.version;
    console.log('%c  miniProgram:', 'color: #0e93e0;background: #aaefe5;', miniProgram);
    setVersion(version);
  }, []);

  // 从云函数获取配置信息
  const [versionHistory, setVersionHistory] = useState<
    {
      version: string;
      time: string;
      desc: string[];
    }[]
  >([
    {
      version,
      time: '',
      desc: [],
    },
  ]);
  useEffect(() => {
    const res = Taro.getStorageSync('globalConfig');
    if (res) {
      setVersionHistory(res.versionHistory);
    }
  }, []);

  return (
    <View className={styles.versionCon}>
      <Text className={textClass} onClick={() => setShowVersionModal(true)}>
        v{versionHistory[0]?.version}
      </Text>
      <AtModal
        className={styles.versionModal}
        isOpened={showVersionModal}
        onClose={async () => {
          await setShowVersionModal(false);
        }}
      >
        <AtModalHeader>版本更新记录</AtModalHeader>
        <AtModalContent>
          {versionHistory.map((item) => {
            return (
              <View className='at-article'>
                <View className='at-article__h1'>v{item.version}</View>
                <View className='at-article__info'>{item.time}</View>
                <View className='at-article__content'>
                  <View className='at-article__section'>
                    {item.desc.map((descItem, index) => (
                      <View className='at-article__p'>
                        {index + 1}. {descItem}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </AtModalContent>
      </AtModal>
    </View>
  );
}
