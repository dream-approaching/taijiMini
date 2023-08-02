import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image } from '@tarojs/components';

interface MyState {}
export default class ViewPage extends Component<{}, MyState> {
  state: MyState = {};

  onShareAppMessage() {
    return {
      title: '关于我',
      path: '/pages/aboutme/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/54.jpg',
    };
  }

  onShareTimeline() {
    return {
      title: '关于我',
      path: '/pages/aboutme/index',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }

  onAddToFavorites() {
    return {
      title: '关于我',
      imageUrl: 'cloud://dev-vza4u.6465-dev-vza4u-1302956475/others/11.jpg',
    };
  }
  // http://proxy.huawei.com:8080
  render() {
    return (
      <View className='at-article'>
        <View className='at-article__h1'>刘建成老师简介</View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            <View className='at-article__p'>
              　　刘建成先生，生于1955年，湖南省邵东市人。自1968年起，勤奋修习多种拳术和器械。1998年，拜入师公马虹先生门下，专心学习传统陈氏太极拳。
            </View>
            <View className='at-article__p'>
              　　刘建成先生是国家武术七段、国家级社会体育指导员、国家一级裁判和高级教练，拥有湖南省太极拳协会名誉副主席和湖南省太极名师的荣誉称号。
            </View>
            <View className='at-article__p'>
              　　曾担任娄底市太极拳协会的常务副会长和总教练，同时在市、省太极拳武术比赛中承担总裁判长、副裁判长、裁判员等重要职责，并多次荣获优秀裁判员的荣誉。
            </View>
            <View className='at-article__p'>
              　　师父严格认真的教学风格备受赞誉。举办太极拳学习班上百次，培养了上万名学员。这些学员在师父的悉心指导下，参加国家、省、市举办的太极拳比赛，斩获金、银、铜牌上百枚。
            </View>
            <View className='at-article__p'>
              　　刘建成先生致力于传播太极拳文化，他不辞辛劳，用心奉献，为太极拳事业的发展做出了卓越贡献。他的教学严谨，让更多人受益，太极拳之美由此传承世代。
            </View>
            <View className='at-article__p'>
              <View className='at-article__info' style={{ textAlign: 'right' }}>
                2023-08-02&nbsp;&nbsp;&nbsp;郑金寿编辑于深圳
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
