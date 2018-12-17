import {
  DBquery
} from '../../models/db-query.js'

const dbquery = new DBquery
const app = new getApp()

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    goods: [],
    sort: '',
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })

    dbquery.getOnQuery_user('like', this.data.openid)
      .then(res => {
        console.log(res)
        this.setData({
          goods: res
        })
      })
  },
  onPullDownRefresh() {
    console.log('下拉刷新')
    dbquery.getOnQuery_user('like', this.data.openid)
      .then(res => {
        console.log(res)
        this.setData({
          goods: res
        })
      })
  }


})