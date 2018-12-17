// pages/my-new/my.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,   //是否授权  切换显示样式
    userInfo:null,
    user: ['普通用户', '会员用户', '管理员', '开发者', '违规用户'],
    admin:''
  },

  onLoad: function(options) {
    this.setData({
      admin: this.data.user[getApp().globalData.admin]
    })
    this.userAuthorized()
  },
  userAuthorized() {
    wx.getSetting({ //查看是否已授权
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
        else {
          console.log('err')
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {  //解决用户点击取消授权时写入空数据二报错
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onAdmin(event) {
    console.log(app.globalData.admin)
    if (app.globalData.admin == 2 || app.globalData.admin == 3){
      wx.navigateTo({
        url: '/pages/administrator/administrator',
      })
    }
  },

  onAbout(event) {
    wx.navigateTo({
      url: '/pages/my-about/my-about',
    })
  },

  onPost(event) {   //发布
    wx.navigateTo({
      url: '/pages/my-post/my-post',
    })
  },

  onLike(event) { 
    wx.navigateTo({
      url: '/pages/my-like/my-like',
    })
  },

  onGoods(event) {    //我的物品
    wx.navigateTo({
      url: '/pages/my-goods/my-goods',
    })
  },

  onDeal(event) {    //交易中
    wx.navigateTo({
      url: '/pages/my-deal/my-deal',
    })
  },

  onRecord(event) {   //交易记录
    wx.navigateTo({
      url: '/pages/my-record/my-record',
    })
  }
})