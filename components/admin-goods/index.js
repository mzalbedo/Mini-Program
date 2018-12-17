// components/my-goods/my-goods.js
import {
  DBupdata
} from '../../models/db-updata.js'

const dbupdata = new DBupdata()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: Object
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
    onadmin(event) {
      console.log(this.properties)
      console.log('更改权限')
      dbupdata.alter_goodsbay('goods',this.properties.goods._id,1)
    }
  }
})
