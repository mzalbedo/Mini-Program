class DBdelete {
  //删除记录----------------------------------------------------------------------------------------------------
  onDelete_like(DB, id) {
    if (id) {
      const db = wx.cloud.database()
      db.collection(DB).doc(id).remove({
        success: res => {
          wx.showToast({
            title: '已删除',
          })
          this.setData({
            counterId: '',
            count: null,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  }
}

export {
  DBdelete
}