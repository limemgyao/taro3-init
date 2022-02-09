import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import api from '@/api'
import S from '@/utils/global'
import { tokenParse } from '@/utils'
import { Analytics } from '@/service' //埋点
import { ENTRANC_VAR } from '@/consts'
import { SpCheckbox } from '@/components'
import configStore from '@/store'
import './wxauth.scss'

const WX_ICON = 'https://mmbiz.qpic.cn/mmbiz_png/6ARSv6zVnN0iaESM36ziaN2xmqUJHD3XlTbJQbucicO5ZKnHUzibKrxl6KmRic3FLNSSWnvaHfCoyzNcKIypXsicHuHw/0?wx_fmt=png'
@connect(({ colors }) => ({
  colors: colors.current
}))
export default class WxAuth extends Component {
  state = {
    isAuthShow: true,
    loginParams: {},
    canIUseGetUserProfile: true,
    checked: true
  }

  componentDidMount() {
    if(process.env.TARO_ENV !== 'weapp') {
      this.setState({
        canIUseGetUserProfile: false
      })
    }

    // this.autoLogin()
  }

  async autoLogin() {
    const { code } = await Taro.login()
    try {
      const { token } = await api.wx.login({ code })
      if (!token) throw new Error(`token is not defined: ${token}`)

      S.setAuthToken(token)
      if (token) {
        let resUser = tokenParse(token);
        console.log('token---888', resUser)
        Analytics.dispatch('setUserId', resUser.user_id)
      }

      const userInfo = Taro.getStorageSync('userinfo')
      if (S.getAuthToken() && !userInfo) {
        const res = await api.member.memberInfo()
        const userObj = {
          username: res.memberInfo.username,
          avatar: res.memberInfo.avatar,
          userId: res.memberInfo.user_id,
          isPromoter: res.is_promoter,
          mobile: res.memberInfo.mobile,
          lv: res.memberInfo.level_id || 0,
          source_from: res.memberInfo.source_from
        }
        Taro.setStorageSync('userinfo', userObj)
        Analytics.dispatch('setUser', {
          ifRegisterMember_ppl: res.memberInfo.source_from == 'default' ? '是' : '否',
        })
      }
      this.collectShop()

      this.redirect()
      return true
    } catch (e) {
      return false
    }
  }

  collectShop = async () => {
    // 收藏店铺浏览足迹
    const { store } = configStore()
    const distributor_id = store.getState().store.storeId
    await api.shop.collect(distributor_id)
  }

  redirect() {
    const redirect = this.$router.params.redirect
    let redirect_url = ''
    if (Taro.getStorageSync('isqrcode') === 'true') {
      redirect_url = redirect
        ? decodeURIComponent(redirect)
        : '/pages/qrcode-buy'
    } else {
      redirect_url = redirect
        ? decodeURIComponent(redirect)
        : '/pages/member/index'
    }

    Taro.redirectTo({
      url: redirect_url
    })
  }

  handleNews = async () => {

    const isLogin = await this.autoLogin()

    if (isLogin) return

    const redirect = this.$router.params.redirect
    let redirect_url = redirect
      ? decodeURIComponent(redirect) : '/pages/member/index'
    let backUrl = redirect_url.split('?')[0]
    Analytics.dispatch('authorSuccess', { entrance_var: ENTRANC_VAR[backUrl] })

    let templeparams = {
      'temp_name': 'yykshop',
      'source_type': 'member',
    }
    let _this = this

    api.user.newWxaMsgTmpl(templeparams).then(tmlres => {
      if (tmlres.template_id && tmlres.template_id.length > 0) {
        wx.requestSubscribeMessage({
          tmplIds: tmlres.template_id,
          complete() {
            _this.handleReg()
          },
          fail(e) {
            console.log(e);
          }
        })
      }
    })
  }

  handleGetUserInfo = async (res) => {
    const loginParams = res.detail

    this.setState({
      loginParams: loginParams || {}
    })
  }

  handleGetUserProfile = () => {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: data => {
        const res = {
          detail: data
        }
        this.handleGetUserInfo(res).then(() => {
          this.handleNews()
        }).catch()
      }
    })
  }

  async handleReg() {
    const { loginParams } = this.state
    const { iv, encryptedData, rawData, signature, userInfo } = loginParams

    if (!iv || !encryptedData) {
      Taro.showModal({
        title: '授权提示',
        content: `需要您的授权才能购物`,
        showCancel: false,
        confirmText: '知道啦'
      })

      return
    }


    const { code } = await Taro.login()

    Taro.showLoading({
      mask: true,
      title: '正在加载...'
    })

    try {
      const uid = Taro.getStorageSync('distribution_shop_id')
      let params = {
        code,
        iv,
        encryptedData,
        rawData,
        signature,
        userInfo
      }
      const trackParams = Taro.getStorageSync('trackParams')
      if (trackParams) {
        Object.assign(params, { source_id: trackParams.source_id, monitor_id: trackParams.monitor_id })
      }
      if (uid) {
        Object.assign(params, { inviter_id: uid })
      }
      const { token, open_id, union_id, user_id } = await api.wx.prelogin(params)

      S.setAuthToken(token)
      Analytics.dispatch('identify', {
        openid: open_id,
        unionid: union_id
      })

      // 埋点
      if (token) {
        let resUser = tokenParse(token);
        Analytics.dispatch('setUserId', resUser.user_id)

      }
      // 绑定过，跳转会员中心
      if (user_id) {
        await this.autoLogin()
        return
      }

      const redirect = this.$router.params.redirect
      let regurl = `/others/pages/auth/auth-phone?code=${code}&open_id=${open_id}&union_id=${union_id}`
      if (redirect) {
        regurl = `/others/pages/auth/auth-phone?code=${code}&open_id=${open_id}&union_id=${union_id}&redirect=${redirect}`
      }
      Taro.redirectTo({
        url: regurl
      })
    } catch (e) {
      console.info(e)
      Taro.showToast({
        title: '授权失败，请稍后再试',
        icon: 'none'
      })
    }

    Taro.hideLoading()
  }

  handleBackHome = () => {
    Taro.navigateBack({
      delta: 1,
      fail: (err) => {
        Taro.redirectTo({
          url: `/pages/index`
        })
      }
    })
  }

  toogleChecked = (checked) => this.setState({ checked })

  handleClickAgreement = () => {
    Taro.navigateTo({
      url: '/pages/auth/reg-rule'
    })
  }

  render() {
    const { isAuthShow, canIUseGetUserProfile, checked } = this.state

    return (
      <View className='page-wxauth'>
        {isAuthShow && (
          <View className='sec-auth'>
            <Image src='https://espier-files.kukahome.com/image/2/2021/05/25/669568f9bec9d3cb3b98481320cad297A8g3HGrQndbq4lwEOpvpvylM0b9uEw6k' className='img' />
            <View className='auth-btns'>
              {
                canIUseGetUserProfile ? <AtButton
                  type='primary'
                  lang='zh_CN'
                  className='authorize'
                  customStyle='background: #e60012; border-color: #e60012;'
                  onClick={this.handleGetUserProfile.bind(this)}
                  disabled={!checked}
                >
                  {/* <Image className='wx_icon' src={WX_ICON} /> */}
                  微信登录授权
                </AtButton>
                  : <AtButton
                    type='primary'
                    lang='zh_CN'
                    customStyle='background: #e60012; border-color: #e60012;'
                    openType='getUserInfo'
                    onClick={this.handleNews.bind(this)}
                    onGetUserInfo={this.handleGetUserInfo}
                    disabled={!checked}
                  >授权允许</AtButton>
              }
              <AtButton className='back-btn' type='default' onClick={this.handleBackHome.bind(this)}>拒绝</AtButton>
            </View>
            <View>
              <SpCheckbox
                checked={checked}
                onChange={this.toogleChecked}
              >
                <Text className='tip'>为了更好的给您提供服务，请允许授权您的公开信息</Text>
              </SpCheckbox>
            </View>

              {/* <View className='reg-rule'>
                登录/注册即视为您同意<Text onClick={this.handleClickAgreement} className='reg-rule__to'>《用户协议》</Text>
              </View> */}
          </View>

        )}
      </View>
    )
  }
}
