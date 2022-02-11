import {useState, useEffect} from 'react'
import Taro from '@tarojs/taro';
import {View, Text, Block,Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {TabBar} from '@/components'
import S from '@/utils/global'

import './index.scss'

export default () => {
  useEffect(() => {
    const res = [
      {
        code: '1',
      }
    ]
    const receivedArr = res.filter(item => item.code).map(item => ({...item, isChecked: true}))
  }, [])

  const handleClickMore = () => {
    Taro.navigateTo({
      url:'/subpages/good/detail/index'
    })
  }

  let navHeight = S.get('navHeight');
  return (
    <View>
      <View
        style={`top:${navHeight}px;`}
        //className={`page-index ${top < 1 ? 'onTop' : ''}`}
      >
        <Image src='https://shop.lx1999.cn/images/05/16/5a/81744e320946f7ab3b37684fc76d71e3a8c6eb17.jpg_t.jpg'></Image>
        <View style='text-align:right;font-size:14px;' onClick={() => {handleClickMore()}}>查看更多</View>
      </View>
      <TabBar />
    </View>
  )
}
