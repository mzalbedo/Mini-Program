import {
  DBquery
} from '../../models/db-query.js'

const dbquery = new DBquery
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    sort:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    // const sort = options.sort.substring(0,2)
    // console.log(sort)
    this.setData({
      sort: options.sort.substring(0, 2)
    })
    // const sort = options.sort
    dbquery.getOnQuery_like('goods', this.data.sort)
    .then(res=>{
      console.log(res)
      this.setData({
        goods:res
      })
    })
  },


})