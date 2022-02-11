import React from 'react'
import { createStore } from "redux"
import { useSelector,useDispatch,Provider } from "react-redux"
import {Button, View} from '@tarojs/components'
import Children from './children/index'
import './index.scss'

export default () => {

  const initialState = {num:0}
  const reducer = (state,action) => {
    switch (action.type){
      case 'add':
        return {...state,num:state.num + 1}
        break;
      case 'reduce':
        return {...state,num:state.num - 1}
        break;
    }
    return state
  }

  const store = createStore(reducer,initialState)

  return (
    <View className='index'>
      <Provider store={store}>
        <Children />
      </Provider>
    </View>
  )
}
