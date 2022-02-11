import { Component, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default () => {
  useEffect(() => {
    /*数据过滤，并添加新属性*/
    const res = [
      {
        code: '1',
        name: '哈哈1',
      },
      {
        code: '2',
        name: '哈哈2',
      },
      {
        code: '3',
        name: '哈哈3',
      },
      {
        name: '哈哈4',
      }
    ]
    const receivedArr = res.filter(item => item.code).map(item => ({...item, isChecked: true}))
    // ... 解构对象，组成新对象
    console.log('filter筛选code',res.filter(item => item.code))
    console.log('receivedArr',receivedArr)

  }, [])

  return (
    <View className='index'></View>
  )
}
