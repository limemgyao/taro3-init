import {Component, useState, useEffect, useReducer} from 'react'
import {Button, View} from '@tarojs/components'
import './index.scss'

export default () => {
  const [num, setNum] = useState(0)


  // useEffect 用法
  const a = {name: '1', sex: '男'}
  const b = {name: '2', sex: '男'}
  const [json, setJson] = useState(JSON.stringify(a))

  const isJson = (m) => {
    if (typeof m == 'object' && JSON.stringify(m).indexOf('{') == 0) {
      return true
    }
    return false
  }

  useEffect(() => {
    setJson(isJson(b) ? b : '')
    console.log('json----------', json)
  }, [num])

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
