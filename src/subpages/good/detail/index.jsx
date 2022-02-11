import { Component, useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default () => {
  useEffect(() => {
    const res = [
      {
        code:'1',
      }
    ]
    const receivedArr = res.filter(item => item.code).map(item => ({ ...item, isChecked: true }))
  }, [])

  return (
    <View className='index' style='font-size:14px;'>
      商品详情

    </View>
  )
}
