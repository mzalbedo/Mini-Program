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
    my_goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading() //加载loading

    // var appopenid = getApp().globalData.openid;
    this.setData({
      openid: getApp().globalData.openid
    })

    dbquery.getOnQuery_user('goods', this.data.openid)
      .then(res => {
        console.log(res)
        this.setData({
          my_goods: res
        })
        wx.hideLoading()
      })
  },
  onPullDownRefresh(){
    console.log('下拉刷新')
    dbquery.getOnQuery_user('goods', this.data.openid)
      .then(res => {
        console.log(res)
        this.setData({
          my_goods: res
        })
        wx.hideLoading()
      })
  }
})