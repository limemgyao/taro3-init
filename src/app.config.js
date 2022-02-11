export default {
  pages: [
    'pages/index/index',
    'pages/member/index',
  ],
  subpackages: [
    {
      root: 'subpages',
      pages: [
        'good/detail/index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
