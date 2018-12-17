// components/my-goods/my-goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    users:Object,


    // users:{
    //   type:[],
    //   ad: '',
    //   arr: ['普通用户', '会员用户', '管理员', '开发者', '违规用户'],
    //   observer: function (users) {
    //   ad=this.properties.users.arr[this.properties.users.admin]
    //   }
    // }
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

      const user = this.properties.users._id
      wx.navigateTo({
        url: `/pages/user-detail/user-detail?user=${user}`
      })
    }
  }
})
