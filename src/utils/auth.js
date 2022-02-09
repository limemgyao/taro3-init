/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro'
import { login, getOpenid, reg, prelogin } from '@/servers/servers'
import global from '@/global'
import { dispatcher } from '@opcjs/zoro'

export async function signIn () {
  try {
    const { code } = await Taro.login()
    let params = {
      code
    }
    const { token } = await login(params)
    global.setAuthToken(token)
    dispatcher.auth.updateState({
      isAuthorize: true
    })
  } catch (e) {
    const { code } = await Taro.login()
    let params = {
      code
    }
    const { getSessionKey_res_code } = await getOpenid(params)

    const result = await Taro.login()
    let params_login = {
      code: result.code,
    }
    await prelogin(params_login)
    let data = {
      user_type: 'wechat',
      auth_type: 'wxapp',
      union_id: getSessionKey_res_code.unionid,
      open_id: getSessionKey_res_code.openid
    }
    await reg(data)

    const result_login = await Taro.login()
    let params_wxlogin = {
      code: result_login.code
    }
    const { token } = await login(params_wxlogin)
    global.setAuthToken(token)
    dispatcher.auth.updateState({
      isAuthorize: true
    })
  }
}