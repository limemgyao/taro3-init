import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {AtTabBar} from 'taro-ui'
import {getCurrentRoute} from '@/utils'
import S from '@/utils/global'

export default class TabBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localCurrent: 0,
      backgroundColor: '',
      color: '',
      selectedColor: '',
      tabList: []
    }
  }

  componentDidMount() {
    let list = []
    let bool = process.env.TARO_ENV === 'h5'
    if (bool) {
      list = [
        {title: '首页', iconPrefixClass: 'in-icon', iconType: 'shouye_huaban', url: '/pages/index/index', urlRedirect: true},
        {title: '找好物', iconPrefixClass: 'in-icon', iconType: 'zhongcao-01', url: '/pages/recommend/list', urlRedirect: true},
        {title: '看直播', iconPrefixClass: 'in-icon', iconType: 'kanzhibo_huaban', url: '/pages/live-marketing/room-list', urlRedirect: true},
        /*{ title: '购物车', iconPrefixClass: 'in-icon', iconType: 'gouwuche_huaban', url: '/pages/cart/espier-index', text: this.cartCount || '', max: '99', urlRedirect: true },*/
        {title: '我的', iconPrefixClass: 'in-icon', iconType: 'wode_huaban', url: '/pages/member/index', urlRedirect: true},
      ]
    } else {
      this.setState({
        backgroundColor: '#fff',
        color: '#818181',
        selectedColor: '#E60012',
      })
      list = [
        {title: '首页', iconPrefixClass: 'in-icon', iconType: 'shouye_huaban', url: '/pages/index/index', urlRedirect: true},
        //{title: '找好物', iconPrefixClass: 'in-icon', iconType: 'zhongcao-01', url: '/pages/recommend/list', urlRedirect: true},
        //{title: '看直播', iconPrefixClass: 'in-icon', iconType: 'kanzhibo_huaban', url: '/pages/live-marketing/room-list', urlRedirect: true},
        /*{ title: '购物车', iconPrefixClass: 'in-icon', iconType: 'gouwuche_huaban', url: '/pages/cart/espier-index', text: this.cartCount || '', max: '99', urlRedirect: true },*/
        {title: '我的', iconPrefixClass: 'in-icon', iconType: 'wode_huaban', url: '/pages/member/index', urlRedirect: true},
      ]
    }

    this.setState({
      tabList: list
    }, () => {
      this.updateCurTab()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== undefined) {
      this.setState({localCurrent: nextProps.current})
    }
  }

  updateCurTab() {
    const {tabList, localCurrent} = this.state
    const fullPath = ((getCurrentRoute(this.$router).fullPath).split('?'))[0]
    const {url} = tabList[localCurrent]
    if (url && url !== fullPath) {
      const nCurrent = tabList.findIndex((t) => t.url === fullPath) || 0
      this.setState({
        localCurrent: nCurrent
      })
    }
  }

  handleClick = (current) => {
    const cur = this.state.localCurrent

    if (cur !== current) {
      const curTab = this.state.tabList[current]
      const {url, urlRedirect, withLogin} = curTab

      if (url === 'toLink') {
        Taro.navigateToMiniProgram({
          appId: 'wx7abde8ea3d586143',
          path: 'pages/index/index?orgId=3FO4K4VY4S5M'
        })
        return
      }

      const fullPath = ((getCurrentRoute(this.$router).fullPath).split('?'))[0]

      if (withLogin && !S.getAuthToken()) {
        return Taro.navigateTo({
          url: process.env.APP_AUTH_PAGE
        })
      }

      if (url && fullPath !== url) {
        if (!urlRedirect || (url === '/pages/member/index' && !S.getAuthToken())) {
          //Taro.navigateTo({url})
          Taro.redirectTo({url})
        } else {
          Taro.redirectTo({url})
        }
      }
    }
  }

  render() {
    const {color, backgroundColor, selectedColor, tabList, localCurrent} = this.state
    return (
      <AtTabBar
        fixed
        color={color}
        backgroundColor={backgroundColor}
        selectedColor={selectedColor}
        tabList={tabList}
        onClick={this.handleClick}
        current={localCurrent}
      />
    )
  }
}
