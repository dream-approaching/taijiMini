import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { getFileCloudId } from '@src/utils';

interface MyState {
  aboutMe: {
    title: string;
    desc: string[];
    author: string;
    avatar: string[];
  };
}
export default class ViewPage extends Component<{}, MyState> {
  state: MyState = {
    aboutMe: {
      title: '',
      desc: [],
      author: '',
      avatar: [],
    },
  };

  onShareAppMessage() {
    return {
      title: '关于我们',
      path: '/pages/aboutme/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '关于我们',
      path: '/pages/aboutme/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '关于我们',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  componentDidMount(): void {
    const res = Taro.getStorageSync('globalConfig');
    if (res) {
      this.setState({
        aboutMe: res.aboutMe,
      });
    }
  }

  render() {
    const { aboutMe } = this.state;
    const imgKey = 'baduanjin/20220714204624.jpg';
    return (
      <View className='at-article' style={{ marginBottom: 80 }}>
        <View className='at-article__h1'>{aboutMe.title}</View>
        <View className='at-article__content'>
          {aboutMe.avatar.length > 0 && (
            <Swiper
              indicatorDots={aboutMe.avatar.length > 1}
              indicatorActiveColor='#6392e5'
              autoplay
            >
              {aboutMe.avatar.map((item) => {
                return (
                  <SwiperItem key={item}>
                    <Image
                      mode='widthFix'
                      lazyLoad
                      style={{ width: '90%', marginLeft: '5%', marginTop: '12px' }}
                      src={item}
                    />
                  </SwiperItem>
                );
              })}
            </Swiper>
          )}
          <View className='at-article__section'>
            {aboutMe.desc.map((item) => (
              <View className='at-article__p'>{item}</View>
            ))}
            <View className='at-article__p'>
              <View className='at-article__info' style={{ textAlign: 'right' }}>
                {aboutMe.author}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
