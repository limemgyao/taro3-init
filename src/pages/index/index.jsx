import {Component, useState, useEffect} from 'react'
import {View, Text, Block} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import {TabBar} from '@/components'

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

  return (
    <Block>
      <View className='index' style='font-size:14px;'>我是首页</View>
      <TabBar />
    </Block>
  )
}
