import {
  DBquery
} from '../../models/db-query.js'

import {
  DBupdata
} from '../../models/db-updata.js'

const dbupdata = new DBupdata()
const dbquery = new DBquery()

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    // array: ['普通用户', '会员用户', '管理员', '开发者', '违规用户'],
    array: ['普通用户', '会员用户', '管理员', '开发者', '违规用户'],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(getApp().globalData.admin == 3){
      this.setData({
        admin:true
      })
    }
    wx.showLoading()
    console.log(options)
    var user_id = options.user

    dbquery.getOnQuery_userid('user', user_id)
    .then(res=>{
      console.log(res)
      this.setData({
        user:res[0],
        index:res[0].admin
      })
    })

    this._onUser('evaluate', user_id)   //评价
  },

  order(){
    wx.makePhoneCall({
      phoneNumber: this.data.user.tel // 仅为示例，并非真实的电话号码
    })
  },

  //用户评价查询
  _onUser(DB, selluser) {
    const db = wx.cloud.database()
    // console.log(user)
    db.collection(DB).where({
      sell_openid: selluser
    }).get({
      success: res => {
        console.log('[用户评价] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        wx.hideLoading()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[用户评价] [查询记录] 失败：', err)
        wx.hideLoading()
        wx.stopPullDownRefresh()//关闭下拉刷新
      }
    })
  },

  bindPickerChange(e){
    console.log(this.data.index)
    if(this.data.index == 3){
      return
    }
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var value = e.detail.value;
    this.setData({
      index: e.detail.value,
    })

    //云函数的修改
    wx.cloud.callFunction({
      name: 'dbalter',
      data: {
        userid: this.data.user._id,
        admin: this.data.index,
      },
      success: res => {
        wx.showToast({
          title: '权限已修改',
        })
        console.log(res.result)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '权限已修改失败',
        })
        console.error('[云函数] [权限] 调用失败：', err)
      }
    })

    // dbquery.getOnAlteruser('user','2','1')
  }
})