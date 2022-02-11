import React, {useEffect,} from 'react'
import Taro from '@tarojs/taro';
import S from '@/utils/global'
import './app.scss'

const App = (props) => {

  useEffect(() => {
   getSystemInfo()
  }, [])

  const getSystemInfo = () => {
    if (process.env.TARO_ENV === 'weapp') {
      let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
      Taro.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight
          let navTop = menuButtonObject.top //胶囊按钮与顶部的距离
          let navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
          S.set('navTop', navTop)
          S.set('navHeight', navHeight)
          S.set('statusBarHeight', statusBarHeight)
          S.set('windowHeight ', res.windowHeight)
        }
      })
    }
  }

  return (
    props.children
  )
}

export default App
