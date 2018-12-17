import {
  DBquery
} from '../../models/db-query.js'
import {
  DBadd
} from '../../models/db-add.js'
import {
  DBdelete
} from '../../models/db-delete.js'
import{
  DBupdata
} from '../../models/db-updata.js'

const dbupdata = new DBupdata()
const dbdelete = new DBdelete()
const dbquery = new DBquery()
const dbadd = new DBadd

var app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    user: [],
    goods: [],

    goods_id: '', //物品记录id 用于收藏中做 外键
    goods_user: '', //记录物品发布人
    delete_id: '', //删除用
    comments: [],
    likeStatus: false,
    posting: false,
    show: false, //物品不是自己的
    admin: false, //是否是管理员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      options: options
    })
    var now = new Date()
    wx.showLoading() //加载loading
    //获取用户openid
    this.setData({
      openid: getApp().globalData.openid,
      goods_id: options.bid,
      goods_user:options.user
    })
    // 初始化打卡时间
    this.setData({
      'time': util.getYMD(now),
    });
    console.log(this.data.time)

    const bid = options.bid
    const userid = this.data.goods_user
    const openid = this.data.openid

    const goods = dbquery.getOnQuery_goods('goods', bid)
    const user = dbquery.getOnQuery_user('user', userid)
    const like = dbquery.getOnQuery_goodslike('like', bid)

    // 行的Promise 合体   在全部运行完后再执行then回调，时间取决于最长的时间
    // race 竞争   当任意一个完成后  就进行回调
    Promise.all([goods, user, like])
      .then(res => {
        console.log(res)
        this.setData({
          goods: res[0],
          user: res[1][0],
          goods_user:res[0]._openid
        })
        if (res[0]._openid == this.data.openid){
          this.setData({
            show:true
          })
        }
        if (getApp().globalData.admin == 3 || getApp().globalData.admin == 2){  
          console.log(getApp().globalData.admin)
          this.setData({
            admin:true
          })
        }
        if (res[2][0]) {
          console.log('已收藏')
          this.setData({
            likeStatus: true,
            delete_id: res[2][0]._id
          })
        } else {
          console.log('没收藏')
          this.setData({
            likeStatus: false
          })
        }
        // console.log(this.data.user)
        wx.hideLoading()
      })
  },

  onShow(){
    const options = this.data.options
    console.log(options)
    var now = new Date()
    wx.showLoading() //加载loading
    //获取用户openid
    this.setData({
      openid: getApp().globalData.openid,
      goods_id: options.bid,
      goods_user: options.user
    })
    // 初始化打卡时间
    this.setData({
      'time': util.getYMD(now),
    });
    console.log(this.data.time)

    const bid = options.bid
    const userid = this.data.goods_user
    const openid = this.data.openid

    const goods = dbquery.getOnQuery_goods('goods', bid)
    const user = dbquery.getOnQuery_user('user', userid)
    const like = dbquery.getOnQuery_goodslike('like', bid)

    // 行的Promise 合体   在全部运行完后再执行then回调，时间取决于最长的时间
    // race 竞争   当任意一个完成后  就进行回调
    Promise.all([goods, user, like])
      .then(res => {
        console.log(res)
        this.setData({
          goods: res[0],
          user: res[1][0],
          goods_user: res[0]._openid
        })
        if (res[0]._openid == this.data.openid) {
          this.setData({
            show: true
          })
        }
        if (getApp().globalData.admin == 3 || getApp().globalData.admin == 2) {
          console.log(getApp().globalData.admin)
          this.setData({
            admin: true
          })
        }
        if (res[2][0]) {
          console.log('已收藏')
          this.setData({
            likeStatus: true,
            delete_id: res[2][0]._id
          })
        } else {
          console.log('没收藏')
          this.setData({
            likeStatus: false
          })
        }
        // console.log(this.data.user)
        wx.hideLoading()
      })

    dbquery.getOnQuery_goodspj('evaluate',this.data.goods_id)  //获取物品评论
    .then(res=>{
      console.log(res)
      this.setData({
        comments:res.data
      })
    })
  },

  onalter(){
    var goods_id = this.data.goods_id
    wx.navigateTo({
      url: `/pages/my-post/my-post?goods_id=${goods_id}`,
    })
  },

  onFakePost: function(event) {   //短评触发
    this.setData({
      posting: true
    })
  },

  onCancel: function(event) {     //取消短评输入
    this.setData({
      posting: false
    })
  },

  onPost(event) {   //接收短评
    if (!event) {
      return
    }
    console.log(event)
    const content = event.detail.value
    dbadd.onadd_pj(this.data.goods_user, this.data.goods_id,content,this.data.time)
    .then(res=>{

    })
    
  },

  onLike(event) {
    // console.log(this.data)
    //删除
    const delete_id = this.data.delete_id
    //新增  ┓( ´∀` )┏
    const goods_id = this.data.goods_id
    const time = this.data.time
    const img_url = this.data.goods.image_id
    const goods_name = this.data.goods.goods_name
    const goods_price = this.data.goods.price

    if (this.data.likeStatus) {
      this.setData({
        likeStatus: false
      })
      dbdelete.onDelete_like('like', delete_id)

    } else {
      this.setData({
        likeStatus: true
      })
      console.log('添加收藏ID：', goods_id, img_url)
      console.log('添加img：', img_url)
      dbadd.onadd_like(goods_id, time, img_url, goods_name, goods_price)
    }
  },

  oncall() {
    wx.makePhoneCall({
      phoneNumber: this.data.user.tel
    })
  },

  ondelete() { //删除物品
    if (this.data.admin) {
      console.log('管理员删除物品ID：', this.data.goods_id)
      //yun
      wx.cloud.callFunction({
        name: 'remove',
        data: {
          mzid: this.data.goods_id,
          mzdb: 'goods'
        },
        success: res => {
          wx.showToast({
            title: '调用成功',
          })
          this.setData({
            result: JSON.stringify(res.result)
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
    } else {
      console.log('删除物品ID：', this.data.goods_id)
      dbdelete.onDelete_like('goods', this.data.goods_id)
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onbuy(){
    const img_url = this.data.goods.image_id
    const goods_name = this.data.goods.goods_name
    const goods_price = this.data.goods.price
    dbupdata.alter_goodsbay('goods',this.data.goods_id,2)
    dbadd.onadd_record(this.data.goods_user, this.data.goods_id, this.data.time,img_url, goods_name, goods_price) //┓( ´∀` )┏
  },
   onimage(){
     var url = this.data.goods.image_id
      wx.previewImage({
        urls: [url],  //需要预览的图片HTTP连接列表
        current: url, //当前显示图片的hTTP连接
    })
   }
})