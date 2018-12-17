import {
  random
} from '../../utils/common.js'
import {
  DBadd
} from '../../models/db-add.js'
import {
  DBquery
} from '../../models/db-query.js'
import{
  DBupdata
}from '../../models/db-updata.js'

const dbupdata = new DBupdata()
const dbadd = new DBadd()
const dbquery = new DBquery()
var util = require('../../utils/util.js')

var app = getApp();

Page({
  data: {
    img_url: '',
    img_name: '',
    img_uurl: '', //记录修改时的源图片
    task: {
      goods_name: '',
      goods_detail: '',
      goods_sort: '书籍',
      image_id: '',
      price: '',
      goods_create: '2016-11-00',
      goods_up: '2016-11-00',
      status: 0,
    },
    openid: '',
    userInfo: {},
    creating: false,
    button: {
      txt: '发布'
    },
    hidden1: true,
    array: ['书籍', '电器', '桌子', '玩偶', '电脑', '其他'],
    index: 0
  },

  onLoad(event) {
    console.log(event)
    this.setData({
      alter_id: event.goods_id
    })
    if (event.goods_id) {
      console.log('修改')
      dbquery.getOnQuery_goods('goods', event.goods_id)
        .then(res => {
          console.log(res)
          if (res.goods_sort == '书籍') { //传值 错误  导致.....
            this.setData({
              index: 0
            })
          }
          if (res.goods_sort == '电器') {
            this.setData({
              index: 1
            })
          }
          if (res.goods_sort == '桌子') {
            this.setData({
              index: 2
            })
          }
          if (res.goods_sort == '玩偶') {
            this.setData({
              index: 3
            })
          }
          if (res.goods_sort == '电脑') {
            this.setData({
              index: 4
            })
          }
          if (res.goods_sort == '其他') {
            this.setData({
              index: 5
            })
          }
          this.setData({
            'task.goods_name': res.goods_name,
            'task.goods_detail': res.goods_detail,
            'task.price': res.price,
            img_url: res.image_id,
            img_uurl: res.image_id,
            'button.txt': '更改'
          })
        })
    }

    var now = new Date();
    this.userAuthorized()
    this.setData({
      'task.goods_create': util.getYMD(now),
      'task.goods_up': util.getYMD(now)
    })
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
        } else {
          console.log('err')
        }
      }
    })
  },

  // 获取物品名称
  ongoods_name: function(e) {
    // console.log(e)
    this.setData({
      'task.goods_name': e.detail.value
    });
  },

  // 获取物品介绍
  ongoods_detail: function(e) {
    this.setData({
      'task.goods_detail': e.detail.value
    });
  },

  // 获取物品类别
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      'task.goods_sort': this.data.array[e.detail.value]
    })
    console.log(this.data.task.goods_sort)
  },


  // 获取物品价格
  ongoods_price: function(e) {
    this.setData({
      'task.price': e.detail.value
    });
  },


  // 获取物品图片
  ongoods_img: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePath = res.tempFilePaths[0]
        // console.log('cloudPath')
        const cloudPath = 'goods/' + random(17) + tempFilePath.match(/\.[^.]+?$/)[0]
        // console.log(cloudPath)
        this.setData({
          img_url: res.tempFilePaths[0],
          img_name: cloudPath,
        })
      },
    })
  },

  //提交上传
  bindSubmit(e) {
    var that = this;
    var tas = this.data.task
    var creating = this.data.creating
    if (tas.goods_name == '' || tas.goods_detail == '' || !tas.price) {
      console.log('name')
      this.setData({
        hidden1: false
      })
    } else {
      if (!creating) {
        this.setData({
          creating: true
        })
      }
      this.createTask()
    }
  },

  // 创建任务
  createTask: function() {
    wx.showToast({
      title: '新建中',
      icon: 'loading',
      duration: 10000
    })
    if (this.data.img_uurl == this.data.img_url) {
      this.setData({
        'task.image_id': this.data.img_uurl
      })
      dbupdata.alter_goods('goods',this.data.alter_id,this.data.task)
      
      wx.navigateBack({
        delta: 1
      })
    } else {
      dbadd.img_uploading(this.data.img_name, this.data.img_url) //先img
        .then(res => {
          // console.log('ID',res)
          this.setData({
            'task.image_id': res
          })
          dbadd.onAdd_goods('goods', this.data.task)
          wx.navigateBack({
            delta: 1
          })
        })
    }
  },

  // 隐藏提示弹层
  modalChange: function(e) {
    this.setData({
      hidden1: true
    })
  },

})