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
    status: 2    //物品status状态 ：0 未审核、1 上架中、2 交易中、3 已出售、4 物品违规
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading() //加载loading

    // var appopenid = getApp().globalData.openid;
    this.setData({
      openid: getApp().globalData.openid
    })
    

    dbquery.getOnQuery_status('goods', this.data.openid, 2)
      .then(res => {
        console.log(res)
        this.setData({
          my_goods: res.data
        })
        wx.hideLoading()
      })
  },
})