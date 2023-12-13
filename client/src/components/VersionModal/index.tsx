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
  const [config, setConfig] = useState<any>({});
  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: 'getConfig',
      })
      .then((res) => {
        setConfig(res.result);
      });
  }, []);

  return (
    <View className={styles.versionCon}>
      <Text className={textClass} onClick={() => setShowVersionModal(true)}>
        版本： v{config.version || version}
      </Text>
      <AtModal
        className={styles.versionModal}
        isOpened={showVersionModal}
        onClose={async () => {
          await setShowVersionModal(false);
        }}
      >
        <AtModalHeader>v{config.version || version}版本说明</AtModalHeader>
        <AtModalContent>
          <Text>{config.versionTips?.split(' ').join('\n\r')} </Text>
        </AtModalContent>
      </AtModal>
    </View>
  );
}
