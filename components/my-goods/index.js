// components/my-goods/my-goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(event) {
      console.log(this.properties)
      const goods_user = this.properties.goods._openid
      const bid = this.properties.goods._id
      wx.navigateTo({
        url: `/pages/goods-detail/goods-detail?bid=${bid}&user=${goods_user}`
      })
    }
  }
})
