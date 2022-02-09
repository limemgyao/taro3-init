import Taro from '@tarojs/taro'
import { getDistributorInfo } from '@/servers/servers'

// 请在onload 中调用此函数，保证千人千码跟踪记录正常
// 用户分享和接受参数处理
export const entryLaunch = async (data, isNeedLocate) => {
  let options = null
  if (data.scene) {
    const scene = decodeURIComponent(data.scene)
    //格式化二维码参数
    options = parseUrlStr(scene)
  } else {
    options = data
  }

  let store = {}

  // 传过来的店铺id
  if (options.dtid) {
    store = await handleDistributorId(options.dtid)
    // dtidValid = store.status ? false : true
  }

  if (!store.status) {
    options.store = store
    options.dtid = store.distributor_id
  }

  return options
}


// distributorId 店铺ID
async function handleDistributorId (distributorId) {
  const res = await getDistributorInfo({ distributor_id: distributorId })
  if (res.status === false) {
    res.store_id = 0
  }
  return res
}

// 格式化URL字符串
function parseUrlStr (urlStr) {
  var keyValuePairs = []
  if (urlStr) {
    for (var i = 0; i < urlStr.split('&').length; i++) {
      keyValuePairs[i] = urlStr.split('&')[i]
    }
  }
  var kvObj = []
  for (var j = 0; j < keyValuePairs.length; j++) {
    var tmp = keyValuePairs[j].split('=')
    kvObj[tmp[0]] = decodeURI(tmp[1])
  }
  return kvObj
}
