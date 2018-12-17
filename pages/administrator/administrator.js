import {
  DBquery
} from '../../models/db-query.js'

const dbquery = new DBquery()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    my_goods: [],
    show:1,
    users:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading() //加载loading
    if (getApp().globalData.admin == 3){
      this.setData({
        admin: true
      })
    }

    // var appopenid = getApp().globalData.openid;
    this.setData({
      openid: getApp().globalData.openid
    })

    dbquery.getOnQuery_userall('user')
      .then(res => {
        console.log(res)
        this.setData({
          users: res.data
        })
        wx.hideLoading()
      })
  },

  onuser(){
    console.log('用户')
    this.setData({
      show:1
    })
    dbquery.getOnQuery_userall('user')
      .then(res => {
        console.log(res)
        this.setData({
          users: res.data
        })
        wx.hideLoading()
      })
  },

  onadd(){
    console.log('已上架')
    this.setData({
      show: 2
    })
    dbquery.getOnQuery_statusall('goods', 1)
      .then(res => {
        console.log(res)
        this.setData({
          my_goods: res.data
        })
        wx.hideLoading()
      })
  },

  onaudit(){
    console.log('待审核')
    this.setData({
      show: 3
    })
    dbquery.getOnQuery_statusall('goods', 0)
      .then(res => {
        console.log(res)
        this.setData({
          my_goods: res.data
        })
        wx.hideLoading()
      })
  },
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.setData({
      show: 1
    })
    dbquery.getOnQuery_userall('user')
      .then(res => {
        console.log(res)
        this.setData({
          users: res.data
        })
        wx.hideLoading()
      })
  }
})