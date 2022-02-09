export const defalutTabList = [
  {
    label: '全部',
    status: 0
  },
  {
    label: '待付款',
    status: 5
  },
  {
    label: '待收货',
    status: 2
  },
  {
    label: '待取货',
    status: 4
  },
  {
    label: '退货退款',
    status: 7
  },
  // {
  //   label: '待发货',
  //   status: 6
  // },
  // {
  //   label: '已完成',
  //   status: 3
  // },
]

export const indexOrderTab = [
  {
    id: 5,
    icon: 'icon-daifukuan',
    name: '待付款'
  },
  {
    id: 2,
    icon: 'icon-daishouhuo',
    name: '待收货'
  },
  {
    id: 4,
    icon: 'icon-daiquhuo',
    name: '待取货'
  },
  {
    id: 7,
    icon: 'icon-tuihuanhuo',
    name: '退换货'
  },
]

export const DEFAULT_TYPE = '1'
export const E_INVOICE = 'e_invoice'
export const PAPER_INVOICE = 'paper_invoice'

export const TITLE_TYYE_CONFIG = [
  {
    label: '个人', value: DEFAULT_TYPE,
    disabled: false
  },
  {
    label: '企业', value: '0',
    disabled: false
  },
]

/** 接口返回判断成功失败数字字符串 */
export const SUCCESS_NUMBER_STRING = '1'

export const RECEIPT_TYPE = 'ziti'

export const presaleDateFormat = 'MM 月 DD 日'

export const format = "YYYY-MM-DD"

export const SUCCESS_STATUS = 'ok'

export const createOrderTabs = [
  {
    value: RECEIPT_TYPE,
    label: '到店即提',
    subtitle: '导完数据当场用新',
    icon: 'icon-daodianziti-011'
  },
  {
    value: 'logistics',
    label: '同城速递',
    subtitle: '最快 2 小时达',
    icon: 'icon-tongchengsudi-011'
  }
]

export const NORMAL = 'normal'

export const payType = 'adapay'

export const NONE = '无'

export const UNAUTHORIZED = '未授权'

export const ORDER_STATUS = {
  ZITI: RECEIPT_TYPE,
  LOGISTICS: 'logistics',
  SHOW_CANCEL: ['PAYED'],
  WAIT_BUYER_CONFIRM: ['WAIT_BUYER_CONFIRM'],
  NOTPAY: 'NOTPAY',
  PAYED: 'PAYED',
  CAN_CANCEL: ['PAYED', 'NOTPAY'],
  PENDING: ['PENDING'],
  NO_APPLY_CANCEL: ['NO_APPLY_CANCEL'],
  FAILS: ['FAILS'],
  DONE: ['DONE'],
  CANCEL: 'CANCEL',
  RECEIVE_STATUS: [1, 2, 4],
  SHOW_RETURN_GOODS: [1]
}

export const TOKEN_IDENTIFIER = 'Authorization'

export const CDN_ORIGIN_URL = 'http://b-img-cdn.yuanyuanke.cn/image/'

export const orderItemSkeleton = {
  "container": "width:690rpx;height:436rpx;",
  "lists": [
    {
      "type": "bg",
      "elements": [
        "width:690rpx;height:436rpx;left:0rpx;top:0;border-radius: 20rpx",
      ]
    },
    {
      "type": "rect",
      "elements": [
        "width:223.5625rpx;height:40rpx;left:30rpx;top:28rpx",
        "width:100rpx;height:20rpx;left:560rpx;top:38rpx",
        "width:180rpx;height:180rpx;left:30rpx;top:110rpx",
        "width:201.53125rpx;height:32rpx;left:248rpx;top:120rpx",
        "width:102.78125rpx;height:32rpx;left:557.21875rpx;top:120rpx",
        "width:86.46875rpx;height:26rpx;left:573.53125rpx;top:174rpx",
        "width:400rpx;height:30rpx;left:30rpx;top:334rpx",
        "width:550rpx;height:30rpx;left:30rpx;top:373rpx",
      ]
    },
    {
      "type": "circle",
      "elements": []
    }
  ]
}

export const closeSection = [18, 50]

export const secondFormat = "YYYY-MM-DD HH:mm:ss"

export const backPageIcon = 'https://uat-aarminiprogram-image.oss-cn-beijing.aliyuncs.com/image/1/2021/07/01/33683dcd702dc9bda59cd4e64e87cad3QQqr30Oq6ja88qsmD9X8m80d9m4ySiNb'

export const homePageIcon = `${CDN_ORIGIN_URL}1/2021/05/31/2e5ae9874bc6af4cc5ec451fd5190d24f2qKyVWvjVvYqbo9PNGOlDBdDn6XyYb4`

export const wxMsgTemplate = {
  temp_name: 'yykweishop',
  source_type: 'reservation'
}

export const phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/


export const EDUSTEPSIMAGE = [
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23eFSJZEJmldWrnUGldzzEiX0QjZALcKV5M',
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23eFt9HgXPlyNJoiTPbHq6l4WfGNBqpxkfJ',
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23eHde1muljiPN6hpnfSQSAEyN1aT7anpsV',
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23eIMQG8ITfTFHcOM3doaZOW6xeWSHV8WN4',
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23e4Dw9bi1R3HkzNejH2aD7ArhxgCaPKfox',
  'https://aar-images.yuanyuanke.cn/image/1/2022/01/05/f86cbde5c9cce11ddd60c52de8f1e23eiDTcAAeEBe5bQIxjxtXkr6oaPpIWJN6p']
export const EDU_STEP_LIST = [
  {
    title: "第一步", content: "在浏览器输入学信网链接：www.chsi.com.cn",
    to: "www.chisi.com.cn", pic: EDUSTEPSIMAGE[0],
  }, {
    title: "第二步", content: "点击“注册”填写个人信息，完成注册。", pic: EDUSTEPSIMAGE[1]
  }, {
    title: "第三步", content: "进入首页，登陆学信网帐号。", pic: EDUSTEPSIMAGE[2]
  }, {
    title: "第四步", content: "点击“在线验证报告” - “申请”。", pic: EDUSTEPSIMAGE[3]
  }, {
    title: "第五步", content: "申请成功后，点击“查看”。", pic: EDUSTEPSIMAGE[4]
  }, {
    title: "第六步", content: "复制“在线验证码”，返回小程序输入并通过优惠认证。", pic: EDUSTEPSIMAGE[5]
  }
]
