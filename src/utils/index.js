import Taro,{getCurrentPages} from '@tarojs/taro'
import classNames from 'classnames'
//import styleNames from 'stylenames'
import qs from 'qs'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import S from '@/utils/global'
import _get from 'lodash/get'
import _findKey from 'lodash/findKey'
import _pickBy from 'lodash/pickBy'
import log from './log'
import canvasExp from './canvasExp'

const isPrimitiveType = (val, type) => Object.prototype.toString.call(val) === type

export function isFunction(val) {
  return isPrimitiveType(val, '[object Function]')
}

//截取字符串
export function StringMatching(val) {
  let index = val.indexOf('.')
  var n = val.substr(0, index);
  console.log(n)
  return n.length
}


export function formatName(name) {
  let newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
    let char = '';
    for (let i = 0, len = name.length - 2; i < len; i++) {
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }

  return newStr;
}

export function isNumber(val) {
  return isPrimitiveType(val, '[object Number]')
}

export function isObject(val) {
  return isPrimitiveType(val, '[object Object]')
}

export function isBoolean(val) {
  return isPrimitiveType(val, '[object Boolean]')
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isString(val) {
  return typeof val === 'string'
}

export function normalizeArray(...args) {
  return args.reduce((ret, item) => ret.concat(item), [])
}

export function getCurrentRoute(router) {
  let page = '';
  if (process.env.TARO_ENV === 'weapp' || process.env.TARO_ENV === 'alipay') {
   page = getCurrentPages().pop()
  }
  const path = page.route;
  const params = _pickBy(page.options, val => val !== '')

  const fullPath = `${path}${Object.keys(params).length > 0 ? '?' + qs.stringify(params) : ''}`

  return {
    path,
    fullPath,
    params
  }
}

export function normalizeQuerys(params = {}) {
  const { scene, ...rest } = params
  const queryStr = decodeURIComponent(scene)

  const ret = {
    ...rest,
    ...qs.parse(queryStr)
  }

  return ret
}

export function cleanParams(params) {
  return _pickBy(params, v => Array.isArray(v)
    ? v.length > 0
    : (v !== undefined && v !== null && v !== ''))
}

export function pickBy(arr, keyMaps = {}) {
  const picker = (item) => {
    const ret = {}
    Object.keys(keyMaps).forEach(key => {
      const val = keyMaps[key]
      if (isString(val)) {
        ret[key] = _get(item, val)
      } else if (isFunction(val)) {
        ret[key] = val(item)
      } else {
        ret[key] = val
      }
    })

    return ret
  }

  if (isArray(arr)) {
    return arr.map(picker)
  } else {
    return picker(arr)
  }
}

export function navigateTo(url, isRedirect) {
  if (isBoolean(isRedirect) && isRedirect) {
    return Taro.redirectTo({ url })
  }

  return Taro.navigateTo({ url })
}

export function resolvePath(baseUrl, params = {}) {
  const queryStr = typeof params === 'string'
    ? params
    : qs.stringify(params)

  return `${baseUrl}${baseUrl.indexOf('?') >= 0 ? '&' : '?'}${queryStr}`
}

export function resolveImgPath(url, size) {
  const regExp = /(\.(\w+)\?)|(\.(\w+)$)/
  if (url) {
    const matches = url.match(regExp)
    if (matches && size) {
      return `${url}_${size}${matches[0]}`
    }
  }
  return ''
}

export function formatTime(time, formatter = 'YYYY-MM-DD') {
  return moment(time).format(formatter)
}

export function formatDateTime(time, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return formatTime(time, formatter)
}

export function formatTimeList(date, dataReg = '', timeReg = '', resReg = '') {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

export function showToast(title) {
  Taro.showToast({
    title,
    icon: 'none'
  })
}

export function copyText(text, msg = '内容已复制') {
  return new Promise((resolve, reject) => {
    if (process.env.TARO_ENV === 'h5') {
      if (copy(text)) {
        showToast(msg)
        resolve(text)
      } else {
        reject()
      }
    } else {
      Taro.setClipboardData({
        data: text,
        success: () => {
          showToast(msg)
          resolve()
        },
        error: reject
      })
    }
  })
}

export function goToPage(page) {
  // eslint-disable-next-line
  const loc = location
  page = page.replace(/^\//, '')
  const url = `${loc.protocol}//${loc.host}/${page}`
  loc.href = url
}

// 不可使用promise/async异步写法
export function authSetting(scope, succFn, errFn) {
  Taro.getSetting({
    success(res) {
      const result = res.authSetting[`scope.${scope}`]
      if (result === undefined) {
        Taro.authorize({
          scope: `scope.${scope}`
        }).then(succFn, errFn)
      } else if (!result) {
        Taro.openSetting().then(succFn, errFn)
      } else {
        succFn()
      }
    }
  })
}


export function joinString(string, s) {
  let arr = string.split(',')
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != s) {
      arr2.push(arr[i])
    }
  }
  return arr2.join(',')
}

export function maskMobile(mobile) {
  return mobile.replace(/^(\d{2})(\d+)(\d{2}$)/, '$1******$3')
}

export const isNativeBrower = (function () {
  const result = Taro.getEnv() === Taro.ENV_TYPE.WEB && navigator.userAgent.toLowerCase().indexOf('micromessenger') < 0

  return () => result
})()

export function hasNavBar() {
  // if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
  //   return ''
  // } else {
  //   return 'has-navbar'
  // }


  if (isNativeBrower()) {
    return 'has-navbar'
  } else {
    return ''
  }
}
export function hasSymbol(str) {
  const containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\！)(\¥)(\…)(\（)(\）)(\「)(\」)(\：)(\“)(\《)(\》)(\？)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\，)(\。)(\?)(\)]+/)
  const type = containSpecial.test(str)
  if (type) {
    showToast('请勿输入特殊字符')
  }
  return type
}

export {
  classNames,
  //styleNames,
  log,
  canvasExp
}
