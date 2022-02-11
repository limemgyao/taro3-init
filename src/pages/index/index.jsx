import {useState, useEffect} from 'react'
import Taro from '@tarojs/taro';
import {View, Text, Block, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {TabBar} from '@/components'
import S from '@/utils/global'

import './index.scss'

export default () => {
  let navHeight = S.get('navHeight');

  const handleClickMore = () => {
    Taro.navigateTo({
      url: '/subpages/good/detail/index'
    })
  }
  const handleClickArray = () => {
    Taro.navigateTo({
      url: '/subpages/array/index'
    })
  }
  const handleClickHooks = () => {
    Taro.navigateTo({
      url: '/subpages/hooks/index'
    })
  }

  return (
    <View>
      <View
        style={`top:${navHeight}px;`}
      >
        <Image src='https://shop.lx1999.cn/images/05/16/5a/81744e320946f7ab3b37684fc76d71e3a8c6eb17.jpg_t.jpg'></Image>
        <View style='text-align:right;font-size:14px;' onClick={() => {handleClickArray()}}>数组</View>
        <View style='text-align:right;font-size:14px;' onClick={() => {handleClickHooks()}}>hk</View>
        <View style='text-align:right;font-size:14px;' onClick={() => {handleClickMore()}}>查看更多</View>
      </View>
      <TabBar />
    </View>
  )
}
