import Taro from '@tarojs/taro'
import { TOKEN_IDENTIFIER } from '@/consts'

const globalData = {}
class Spx {
  getAuthToken () {
    const authToken = Taro.getStorageSync(TOKEN_IDENTIFIER)
    if (authToken && !this.get(TOKEN_IDENTIFIER)) {
      this.set(TOKEN_IDENTIFIER, authToken)
    }
    return authToken
  }

  setAuthToken (token) {
    this.set(TOKEN_IDENTIFIER, token)
    Taro.setStorageSync(TOKEN_IDENTIFIER, token)
  }

  get(key, forceLocal) {
    let val = globalData[key]
    if (forceLocal) {
      val = Taro.getStorageSync(key)
    }
    return val
  }

  set(key, val, forceLocal) {
    globalData[key] = val
    if (forceLocal) {
      Taro.setStorageSync(key, val)
    }
  }

  delete(key, forceLocal) {
    delete globalData[key]
    if (forceLocal) {
      Taro.removeStorageSync(key)
    }
  }

  globalData () {
    if (process.env.NODE_ENV === 'production') {
      return null
    } else {
      return globalData
    }
  }
}

export default new Spx()
