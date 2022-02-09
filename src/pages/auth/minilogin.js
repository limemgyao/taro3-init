import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { SpCheckbox } from '@/components'
import { AtButton } from 'taro-ui'
import S from '@/utils/global'

import { getCurrentRoute } from '@/utils'

import './minilogin.scss'


export default class MiniLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  config = {
    navigationBarTitleText: '登录'
  }

  componentDidMount() {

  }

  bindLogin = () => {
    // if (!this.state.checked) {
    //   Taro.showToast({
    //     title: '请勾选授权',
    //     icon: 'none'
    //   })
    //   return
    // }

    S.login2(this, true, 2)
  }

  toogleChecked = (e) => {
    this.setState({
      checked: e
    })
  }

  render() {
    const { checked } = this.state

    return (
      <View>
        <View className='content'>
          <Image className='img' src='/assets/imgs/icon-gujialogo_huaban.png' mode='aspectFill'></Image>
          <AtButton className='bottom' onClick={this.bindLogin}>微信授权一键登录</AtButton>
          {/* <View className='desc'>
            <SpCheckbox
              checked={checked}
              onChange={this.toogleChecked}
            >
              <Text className='tip'>为了更好的给您提供服务，请允许授权您的公开信息</Text>
            </SpCheckbox>
          </View> */}
        </View>
      </View>
    )
  }
}
