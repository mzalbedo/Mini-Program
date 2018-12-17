class DBquery {
  //主页查询----------------------------------------------------------------------------------------------------------------
  getOnQuery(DB, num) {
    return new Promise((resolve, reject) => {
      this._onQuery(DB, num, resolve, reject)
    })
  }
  //数据查询
  _onQuery(DB, num, resolve, reject) {
    const db = wx.cloud.database()
    db.collection(DB).limit(num).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res.data) //promise成功测试
        wx.hideLoading()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        wx.hideLoading()
        reject() //promise失败测试
      }
    })
  }

  //物品展示----------------------------------------------------------------------------------------------------------------
  getOnQuery_display(DB) {
    return new Promise((resolve, reject) => {
      this._onDisplay(DB, resolve, reject)
    })
  }
  //数据查询
  _onDisplay(DB, resolve, reject) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection(DB).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ',res)
        resolve(res.data) //promise成功测试
        wx.hideLoading()
        wx.stopPullDownRefresh() //关闭下拉刷新
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.hideLoading()
        wx.stopPullDownRefresh() //关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //物品详细信息----------------------------------------------------------------------------------------------------------------
  getOnQuery_goods(DB, bid) {
    return new Promise((resolve, reject) => {
      this._onGoods(DB, bid, resolve, reject)
    })
  }

  _onGoods(DB, bid, resolve, reject) {
    const db = wx.cloud.database()
    console.log(bid)
    db.collection(DB).where({
      _id: bid
    }).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ', res.data[0])
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res.data[0]) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        reject() //promise失败测试
      }
    })
  }

  //物品评价信息----------------------------------------------------------------------------------------------------------------
  getOnQuery_goodspj(DB, bid) {
    return new Promise((resolve, reject) => {
      this._onGoodspj(DB, bid, resolve, reject)
    })
  }

  _onGoodspj(DB, bid, resolve, reject) {
    const db = wx.cloud.database()
    console.log(bid)
    db.collection(DB).where({
      goods_id: bid
    }).get({
      success: res => {
        // console.log('[数据库] [查询记录] 成功: ', res.data[0])
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        reject() //promise失败测试
      }
    })
  }

  //物品状态信息----------------------------------------------------------------------------------------------------------------
  getOnQuery_status(DB, user ,status) {
    console.log('status',DB, user, status)
    return new Promise((resolve, reject) => {
      this._onStatus(DB, user , status, resolve, reject)
    })
  }

  _onStatus(DB, user, status, resolve, reject) {
    const db = wx.cloud.database()
    const _ = db.command
    console.log('正在交易记录')
    db.collection(DB).where(_.and([
      {
        _openid: user
      },
      {
        status: status
      }
    ])).get({
      success: res => {
        console.log('[物品状态信息] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //全部物品状态信息----------------------------------------------------------------------------------------------------------------
  getOnQuery_statusall(DB, status) {
    console.log('statusall', DB, status)
    return new Promise((resolve, reject) => {
      this._onStatusall(DB,status, resolve, reject)
    })
  }

  _onStatusall(DB, status, resolve, reject) {
    const db = wx.cloud.database()
    const _ = db.command
    console.log('正在交易记录')
    db.collection(DB).orderBy('goods_up','asc').where({
        status: status
      }).get({
      success: res => {
        console.log('[物品状态信息] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //收藏表物品信息----------------------------------------------------------------------------------------------------------------
  getOnQuery_goodslike(DB, id) {
    return new Promise((resolve, reject) => {
      this._onGoodslIke(DB, id, resolve, reject)
    })
  }

  _onGoodslIke(DB, id, resolve, reject) {
    const db = wx.cloud.database()
    // console.log(id)
    db.collection(DB).where({
      goods_id: id
    }).get({
      success: res => {
        console.log('[收藏表] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res.data) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[收藏表] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //查询用户----------------------------------------------------------------------------------------------------------------
  getOnQuery_user(DB, user) {
    return new Promise((resolve, reject) => {
      this._onUser(DB, user, resolve, reject)
    })
  }
  //数据查询
  _onUser(DB, user, resolve, reject) {
    const db = wx.cloud.database()
    console.log(user)
    db.collection(DB).where({
      _openid: user
    }).get({
      success: res => {
        console.log('[用户库] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res.data) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[用户库] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //在用户表查询指定用户----------------------------------------------------------------------------------------------------------------
  getOnQuery_userid(DB, user) {
    return new Promise((resolve, reject) => {
      this._onUseid(DB, user, resolve, reject)
    })
  }
  //数据查询
  _onUseid(DB, user, resolve, reject) {
    const db = wx.cloud.database()
    console.log(user)
    db.collection(DB).where({
      _id: user
    }).get({
      success: res => {
        console.log('[用户库] [查询记录] 成功: ', res)
        wx.stopPullDownRefresh()//关闭下拉刷新
        resolve(res.data) //promise成功测试
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[用户库] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }


  //查询全部用户----------------------------------------------------------------------------------------------------------------
  getOnQuery_userall(DB) {
    return new Promise((resolve, reject) => {
      this._onUserall(DB, resolve, reject)
    })
  }
  //数据查询
  _onUserall(DB, resolve, reject) {
    const db = wx.cloud.database()
    console.log('开始查询全体用户')
    db.collection(DB).get({
      success: res => {
        console.log('[用户全体] [查询记录] 成功: ', res)
        resolve(res) //promise成功测试
        wx.stopPullDownRefresh()//关闭下拉刷新
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[用户全体] [查询记录] 失败：', err)
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }

  //模糊查询----------------------------------------------------------------------------------------------------------------
  getOnQuery_like(DB, where) {
    return new Promise((resolve, reject) => {
      this._onLike(DB, where, resolve, reject)
    })
  }
  //数据查询
  _onLike(DB, where, resolve, reject) {
    // console.log(where)
    const db = wx.cloud.database()
    const _ = db.command
    console.log(where)
    db.collection(DB).where(_.or([
      {
        goods_name: db.RegExp({ //利用正则表达式进行模糊查询
          regexp: where,
          options: 'i',
        })
      },
      {
        goods_sort: where
      }  
    ])).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        resolve(res.data) //promise成功测试
        wx.hideLoading()
        wx.stopPullDownRefresh()//关闭下拉刷新
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        wx.hideLoading()
        wx.stopPullDownRefresh()//关闭下拉刷新
        reject() //promise失败测试
      }
    })
  }
}

export {
  DBquery
}