
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //数据绑定
    //三元表达式
    //封装性  开放性

    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //自定义事件
    onLike: function(event) {
      let like = this.properties.like
      this.setData({ //可以接收JavaScript对象  （用来更新指定属性）
        like: !like
      })
      this.triggerEvent('like', {}, {}) 
    }
  }
})