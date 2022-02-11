import { Component, useState, useEffect, useReducer} from 'react'
import {Button, View} from '@tarojs/components'
import './index.scss'

export default () => {

  const [num,setNum] = useState(0)
  useEffect(() => {

  }, [])

  return (
    <View className='index'>
      <View>
        useState:{num}
        <Button onClick={() => setNum(num + 1)}>增加</Button>
        <Button onClick={() => setNum(num - 1)}>减少</Button>
      </View>
      <View>

      </View>
    </View>
  )
}
