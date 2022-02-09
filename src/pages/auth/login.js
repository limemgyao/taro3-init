import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

import { SpToast, NavBar } from '@/components'

import S from '@/utils/global'
import api from '@/api'
import configStore  from '@/store'
import { Analytics } from '@/service' //埋点

import './login.scss'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: {},
      isVisible: false
    }
  }

  handleClickReg= () => {
    Taro.navigateTo({
      url: `/pages/auth/reg`
    })
  }
  componentDidMount() {

  }

  handleSubmit = async (e) => {
    const { value } = e.detail
    const data = {
      ...this.state.info,
      ...value
    }

    if (!data.username || !/1\d{10}/.test(data.username)) {
      return S.toast('请输入正确的手机号')
    }

    if (!data.password) {
      return S.toast('请输入密码')
    }

    Taro.showLoading({
      title: '登陆中',
      mask: true
    })

    try {
      const { token } = await api.user.login(data)
      S.setAuthToken(token)
      let resMember= await api.member.memberInfo()
      Analytics.dispatch('setUserId', resMember.memberInfo.user_id)
      Analytics.dispatch('setUser', {
        ifRegisterMember_ppl:resMember.memberInfo.source_from=='default'?'是':'否',
      })

      // 收藏店铺浏览足迹
      const { store } = configStore()
      const distributor_id = store.getState().store.storeId
      if(distributor_id) {
        await api.shop.collect(distributor_id)
      }

      Taro.hideLoading()

      S.toast('登录成功')

      const redirect = decodeURIComponent(this.$router.params.redirect || process.env.APP_HOME_PAGE)
      Taro.redirectTo({
        url: redirect
      })
    } catch (error) {
      Taro.hideLoading()
      S.toast('登录失败，请稍后再试')
      return false
      //console.log(error)
    }
  }
  onSubmit = (e) => {
    if (process.env.TARO_ENV !== 'h5') {
      this.handleSubmit(e)
    }
  }
  handleChange (name, val) {
    const { info } = this.state
    info[name] = val
  }

  handleBlurMobile = (val) => {
    this.setState({
      info: {
        username: val
      }
    });
  }

  handleClickIconpwd = () => {
    const { isVisible } = this.state
    this.setState({
      isVisible: !isVisible,
    });
  }

  handleErrorToastClose = () => {
    // S.closeToast()
  }

  handleClickForgtPwd = () => {
    Taro.navigateTo({
      url: `/pages/auth/forgotpwd`
    })
  }

  handleNavLeftItemClick = () => {
    // const { redirect } = this.$router.params
    // if (redirect) {
    //   Taro.redirectTo({
    //     url: decodeURIComponent(redirect)
    //   })
    // }
    //
    // Taro.navigateBack()、
    Taro.redirectTo({
      url: process.env.APP_HOME_PAGE
    })
  }

  render () {
    const { info, isVisible } = this.state

    return (
      <View className='auth-login'>
        <NavBar
          onClickLeftIcon={this.handleNavLeftItemClick}
          title='登录'
        />
        <View className='auth-login__reg'>
          <Text onClick={this.handleClickReg}>快速注册</Text>
        </View>
        <AtForm
          onSubmit={this.onSubmit}
        >
          <View className='sec auth-login__form'>
            <AtInput
              title='手机号码'
              name='username'
              maxLength={11}
              type='tel'
              value={info.username}
              placeholder='请输入手机号码'
              onFocus={this.handleErrorToastClose}
              onChange={this.handleChange.bind(this, 'username')}
              onBlur={this.handleBlurMobile.bind(this)}
            />
            <AtInput
              title='密码'
              name='password'
              type={isVisible ? 'text' : 'password'}
              value={info.password}
              placeholder='请输入密码'
              onFocus={this.handleErrorToastClose}
              onChange={this.handleChange.bind(this, 'password')}
            >
              {
                isVisible
                  ? <View className='sp-icon sp-icon-yanjing icon-pwd' onClick={this.handleClickIconpwd}> </View>
                  : <View className='sp-icon sp-icon-icon6 icon-pwd' onClick={this.handleClickIconpwd}> </View>
              }
              <Text className='forgotPwd' onClick={this.handleClickForgtPwd}>忘记密码</Text>
            </AtInput>
          </View>

          <View className='btns'>
            {
              process.env.TARO_ENV === 'weapp'
                ? <AtButton type='primary' formType='submit' onClick={this.handleSubmit}>登录</AtButton>
                : <AtButton type='primary' onClick={this.handleSubmit} formType='submit'>登录</AtButton>
            }
          </View>
        </AtForm>

        <SpToast />
      </View>
    )
  }
}
