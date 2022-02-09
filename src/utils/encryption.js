import Taro from '@tarojs/taro'
import { JSEncrypt } from 'jsencrypt'
import api from '@/api'

// 加密
export default async function getEncryptionStr (val) {
  if (process.env.TARO_ENV == 'h5') {
    if (typeof (val) !== 'string') return
    let publicKey = Taro.getStorageSync('publicKey')
    if (!publicKey) {
      const { public_key } = await api.member.rsa()
      Taro.setStorageSync('publicKey', public_key)
      publicKey = public_key
    }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(val)
  }
}
