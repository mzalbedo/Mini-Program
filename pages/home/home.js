import {
  DBquery
} from '../../models/db-query.js'
import {
  DBadd
} from '../../models/db-add.js'

const dbquery = new DBquery()
const dbadd = new DBadd()
const app = getApp()

Page({
  data: {
    goods: [],
    hotgoods: [
      {
        "name": "书籍",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timg[3].jpg",
        "num": 0
      },
      {
        "name": "电器",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgBQB2ADY4.jpg",
        "num": 1
      },
      {
        "name": "桌子",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgEAT3PRHU.jpg",
        "num": 2
      },
      {
        "name": "玩偶",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgJBY0ZFE8.jpg",
        "num": 3
      },
      {
        "name": "其他",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgPZ2T74LW.jpg",
        "num": 4
      },
      {
        "name": "电脑",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timg2FOTJZD7.jpg",
        "num": 5
      }
    ]

  },
  onLoad: function() {
    wx.showLoading() //加载loading
    const that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        if (res.result.openid == "") {
          res.result.openid = '没有注册'
        }
        app.globalData.openid = res.result.openid
        // wx.hideLoading()
        that.onquery()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.hideLoading()
      }
    })
  },

  onquery(){
    dbquery.getOnQuery_user('user', app.globalData.openid)
      .then(res => {

        console.log('查询', res)
        if (res[0]!=null) {
          console.log('已存在用户信息')
          app.globalData.admin = res[0].admin //记录用户等级 
        }
        else{
          console.log('无用户信息')
          app.globalData.admin = 0 //记录用户等级 
          dbadd.onAdd_user('user', app.globalData.openid)
          wx.showModal({
            title: '警告',
            content: '检测到萌新：是否填写个人信息？',
            cancelText: '暂不填写',
            confirmText: '立即填写',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/my-about/my-about',
                })
              } else if (res.cancel) { }
            }
          })
        }
      }),(error) => {              //失败（顺序不能改变）
        console.log(error)
      }
  },

  onShow: function() {
    dbquery.getOnQuery('goods', 6)
      .then(res => {
        this.setData({
          goods: res
        })
      })
  },
  onSort(event){
    console.log(event)
  }
})