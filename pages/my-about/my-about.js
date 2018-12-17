import {
  DBquery
} from '../../models/db-query.js'
import{
  DBupdata
}from '../../models/db-updata.js'

const dbquery = new DBquery()
const dbupdata = new DBupdata()

var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    tel: '',
    user_name:'',
    address1: '',
    address2: '',
    admin: 1,
    create_time: "",
    up_time: '',


    _id:'', 
    userInfo: null,
    openid: '',
    creating: false,
    buttontext:'上传',
    modalHidden: true, //用于隐藏button栏不能反复点击   
    show: true
  },

  // 初始化设置
  onLoad: function() {
    wx.showLoading() //加载loading
    var that = this
    var now = new Date()

    //获取用户openid
    this.setData({
      openid: getApp().globalData.openid
    })

    //获取用户信息
    wx.getUserInfo({
      success: data => {
        // console.log(data)
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      }
    })
    // 初始化打卡时间
    that.setData({
      'time': util.getYMD(now),
    });

    dbquery.getOnQuery_user('user', this.data.openid)
      .then(res => {
        console.log(res)
        this.setData({
          _id:res[0]._id
        })
        if (res[0]._openid == this.data.openid && res[0].create_time) { //这里不加if会提示 下方赋值为空报错 ┓( ´∀` )┏
          that.setData({
            tel: res[0].tel,
            user_name:res[0].user_name,
            address1: res[0].address1,
            address2: res[0].address2,
            admin: res[0].admin,
            create_time: res[0].create_time,
            up_time: res[0].up_time
          })
        }
        wx.hideLoading()
      })
  },

  // 获取电话
  bindKeyInput: function(e) {
    this.setData({
      'tel': e.detail.value
    });
  },

  // 设置定位地点
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          'address1': res.address,
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //获取详细地址
  bindKeyInput2: function(e) {
    this.setData({
      'address2': e.detail.value
    })
  },

  // 提交、检验
  bindSubmit: function(e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    // console.log(this.data);
    if (!myreg.test(that.data.tel)){
      wx.showToast({
        icon:'none',
        title: '电话格式错误',
      })
      return
    }

    if (that.data.address1 == '' || that.data.address2 == '') {
      this.setData({
        modalHidden: false
      });
    } else {
      if (!this.data.creating) {
        this.setData({
          'creating': true
        });
        var id = this.data._id

        dbupdata.getOnAlter('user', id, this.data)  

      }
    }
    wx.navigateBack({
      delta: 2
    })
  },
  // 隐藏提示弹层
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
})
