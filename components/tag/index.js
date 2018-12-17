// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  //外部样式
  externalClasses:['tag-class'],

  properties: {
    text:String,
    num:Number
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
    onTap(event){
      // this.triggerEvent('tapping',{
      //   text:this.properties.text
      // })
    }
  }
})
