import {
  DBquery
} from '../../models/db-query.js'

const dbquery = new DBquery()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    searching: false,
    openid: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading() //加载loading
    this.setData({
      openid: getApp().globalData.openid
    })

    //云函数的查询
    wx.cloud.callFunction({
      name: 'dbqu',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        wx.showToast({
          title: '加载成功',
        })
        console.log(res.result)
        this.setData({
          goods: res.result.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })

    // dbquery.getOnQuery_display('goods')
    //   .then(res => {
    //     console.log(res)
    //     this.setData({
    //       goods: res
    //     })
    //   })
  },

  onSearchi(event) {
    this.setData({
      searching: true
    })
  },

  cancel(event) {
    this.setData({
      searching: false
    })
  },

  onPullDownRefresh() {
    console.log('下拉刷新')
    //云函数的查询
    wx.cloud.callFunction({
      name: 'dbqu',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        wx.showToast({
          title: '加载成功',
        })
        console.log(res.result)
        this.setData({
          goods: res.result.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  }
})