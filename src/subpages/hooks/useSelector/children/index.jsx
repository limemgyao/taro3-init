import React from 'react'
import { createStore } from "redux"
import { useSelector,useDispatch } from "react-redux"
import {Button, View} from '@tarojs/components'
import './index.scss'

export default () => {

  const {num} = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <View className='index'>
      useSelector:{num}
      <Button onClick={() => dispatch({type:'add'})}>增加</Button>
      <Button onClick={() => dispatch({type:'reduce'})}>减少</Button>
    </View>
  )
}
