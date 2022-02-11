import { useReducer} from 'react'
import {Button, View} from '@tarojs/components'
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
  const [state,dispatch] = useReducer(reducer,initialState)

  const {num} = state

  return (
    <View className='index'>
      <View>
        useReducer:{num}
        <Button onClick={() => dispatch({type:'add'})}>增加</Button>
        <Button onClick={() => dispatch({type:'reduce'})}>减少</Button>
      </View>
      <View>

      </View>
    </View>
  )
}
