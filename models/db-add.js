class DBadd {
  //添加用户--------------------------------------------------------------------------------------------------------------
  onAdd_user(DB, user) {
    const db = wx.cloud.database()
    db.collection(DB).add({
      data: {

      },
      success: res => {
        // wx.showToast({
        //   title: '新增记录成功',
        // })
        console.log('[添加用户数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[添加用户数据库] [新增记录] 失败：', err)
      }
    })
  }

  //添加物品--------------------------------------------------------------------------------------------------------------
  onAdd_goods(DB, goods) {
    console.log(goods)
    const db = wx.cloud.database()
    db.collection(DB).add({
      data: {
        goods_name: goods.goods_name,
        goods_detail: goods.goods_detail,
        goods_sort: goods.goods_sort,
        image_id: goods.image_id,
        price: goods.price,
        goods_create: goods.goods_create,
        goods_up: goods.goods_up,
        status: goods.status
      },
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[添加物品数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[添加物品数据库] [新增记录] 失败：', err)
      }
    })
  }

  //添加图片--------------------------------------------------------------------------------------------------------------
  img_uploading(img_name, img_url) {
    return new Promise((resolve, reject) => {
      this._uploading(img_name, img_url, resolve, reject)
    })
  }
  _uploading(img_name, img_url, resolve, reject) {
    const cloudPath = img_name
    const filePath = img_url
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)
        resolve(res.fileID)
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
        reject()
      },
      complete: () => {}
    })
  }

  //添加收藏记录--------------------------------------------------------------------------------------------------------------
  onadd_like(goods_id, time, img_url, goods_name, goods_price) {
    return new Promise((resolve, reject) => {
      this._onlike(goods_id, time, img_url, goods_name, goods_price, resolve, reject)
    })
  }
  _onlike(goods_id, time, img_url, goods_name, goods_price, resolve, reject) {
    const db = wx.cloud.database()
    db.collection('like').add({
      data: {
        goods_id: goods_id,
        like_time: time,
        image_id: img_url,
        goods_name: goods_name,
        price: goods_price
      },
      success: res => {
        wx.showToast({
          title: '已收藏',
        })
        console.log('[收藏数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[收藏数据库] [新增记录] 失败：', err)
      }
    })
  }

  //添加评价记录------------------000000000000000000000000000000000-----------------------------------------------------------------------
  onadd_pj(sell_openid, goods_id, content, time) {
    return new Promise((resolve, reject) => {
      this._onpj(sell_openid, goods_id, content, time, resolve, reject)
    })
  }
  _onpj(sell_openid, goods_id, content, time, resolve, reject) {
    const db = wx.cloud.database()
    db.collection('evaluate').add({
      data: {
        sell_openid: sell_openid,
        goods_id: goods_id,
        content: content,
        time: time
      },
      success: res => {
        wx.showToast({
          title: '已添加',
        })
        console.log('[添加评价记录] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[添加评价记录] [新增记录] 失败：', err)
      }
    })
  }

  //添加交易记录(不可删除)----------------000000000000000000000000000000000--------------------------------------------------------------------
  onadd_record(sell_openid, goods_id, time, img_url, goods_name, goods_price) {
    return new Promise((resolve, reject) => {
      this._onrecord(sell_openid, goods_id, time, img_url, goods_name, goods_price, resolve, reject)
    })
  }
  _onrecord(sell_openid, goods_id, time, img_url, goods_name, goods_price, resolve, reject) {
    const db = wx.cloud.database()
    db.collection('record').add({
      data: {
        sell_openid: sell_openid,
        goods_id: goods_id,
        goods_create: time,
        image_id: img_url,
        goods_name: goods_name,
        price: goods_price
      },
      success: res => {
        wx.showToast({
          title: '已收藏',
        })
        console.log('[收藏数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[收藏数据库] [新增记录] 失败：', err)
      }
    })
  }

}
export {
  DBadd
}