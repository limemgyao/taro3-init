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

  get (key) {
    return globalData[key]
  }

  set (key, val) {
    globalData[key] = val
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
