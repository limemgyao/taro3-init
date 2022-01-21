import { Component, useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

export default class Index extends Component {

 /* componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }*/
  useEffect(){
    const res = [
      {
        code:'1',
      }
    ]
    const receivedArr = res.filter(item => item.code).map(item => ({ ...item, isChecked: true }))
  }

  render() {
    return (
      <View className='index'></View>
    )
  }
}
