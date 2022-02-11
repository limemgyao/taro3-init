import { Component, useState, useEffect, useReducer} from 'react'
import {Button, View} from '@tarojs/components'
import UseState from './useState/index'
import UseReducer from './useReducer/index'
import UseSelector from './useSelector/index'

export default () => {
  useEffect(() => {

  }, [])

  return (
    <View className='index'>
      <UseState />
      <UseReducer />
      <UseSelector />
    </View>
  )
}
