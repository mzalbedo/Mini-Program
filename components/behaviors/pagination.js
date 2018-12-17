const paginationBev = Behavior({
  data: { 
    dataArray: [],    //分页加载   管理一个页面显示的所有数据
    total: null,
    noneResult: false,  //当为true是表示没有搜索到数据
    loading: false
  },

  methods: {
    setMoreData(dataArray) {    //处理新添加的数据
      const tempArray =
        this.data.dataArray.concat(dataArray)   //合并数据
      this.setData({  
        dataArray: tempArray      //更新合并后的数据
      })
    },

    getCurrentStart() {   //返回起始的数据数
      return this.data.dataArray.length
    },

    setTotal(total) {     
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true   
        })
      }
    },

    hasMore() {   //是否还有更多的数据需要加载
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize() {    //清空数组
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
})

export {
  paginationBev
}