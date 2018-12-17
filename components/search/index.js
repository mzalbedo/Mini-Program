import {
  KeywordModel
} from '../../models/keyword.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

import {
  DBquery
} from '../../models/db-query.js'

const keywordModel = new KeywordModel()
const dbquery = new DBquery()


Component({
  /**
   * 组件的属性列表
   */

  behaviors: [paginationBev], //使用behaviors 
  properties: {
    more: {
      type: String,
      observer: 'loadMore' //_load_more为自定义函数
      // observer: 属性发生变化是触发
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '', //要搜索的数据
    loading: false,
    loadingCenter: false
  },

  attached() { //组件初始化是调用的函数
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    this.setData({
      hotWords: keywordModel.getHot()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) { //取消按键
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) { //点击搜索框的叉
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) { //传入搜索记录
      this._showResult() //当用敲击回车后切换到搜索页面
      this._showLoadingCenter() //加载动画
      const q = event.detail.value || event.detail.text //拿到用户输入的搜索数据 或者 用户点击标签
      this.setData({
        q: q
      })

      dbquery.getOnQuery_like('goods', q).
      then(res => {
        console.log(res)
        this.setMoreData(res) //传入behaviors
        keywordModel.addToHistory(q) //将搜索数据记录写入缓存
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() { //当用敲击回车后切换到搜索页面
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },
  }
})