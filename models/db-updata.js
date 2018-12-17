class DBupdata {
  //更新用户信息---------------------------------------------------------------------------------------------------------------------
  getOnAlter(DB, id, updata) {
    const db = wx.cloud.database()
    console.log(updata)
    db.collection(DB).doc(id).update({
      data: {
        tel: updata.tel,
        user_name: updata.userInfo.nickName,
        address1: updata.address1,
        address2: updata.address2,
        admin: updata.admin ? updata.admin : 2,
        create_time: updata.create_time ? updata.create_time : updata.time,
        up_time: updata.time,
      },
      success: res => {
        wx.showToast({
          title: '更新成功',
        })
        console.error('[数据库] [更新记录] 成功：')
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }
  //更新用户等级---------------------------------失败---------------------------------------------------------------------------
  getOnAlteruser(DB, id, admin) {
    const db = wx.cloud.database()
    console.log(id,admin)
    db.collection(DB).doc('XA5lLHffS3SW6l-4').update({
      data: {
        admin: 2
      },
      success: res => {
        wx.showToast({
          title: '权限以更新',
        })
        console.error('[用户权限] [更新记录] 成功：')
      },
      fail: err => {
        icon: 'none',
          console.error('[用户权限] [更新记录] 失败：', err)
      }
    })
  }
  //更新物品信息---------------------------------------------------------------------------------------------------------------------
  alter_goods(DB,id,updata){
    const db = wx.cloud.database()
    console.log(updata)
    db.collection(DB).doc(id).update({
      data:{
        goods_name: updata.goods_name,
        goods_detail: updata.goods_detail,
        goods_sort: updata.goods_sort,
        image_id: updata.image_id,
        price: updata.price,
        goods_create: updata.goods_create,
        goods_up: updata.goods_up,
        status: updata.status
      },
      success: res => {
        wx.showToast({
          title: '更新成功',
        })
        console.error('[数据库] [更新记录] 成功：')
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }

  //更新物品状态---------------------------------------------------------------------------------------------------------------------
  alter_goodsbay(DB, id,status) {
    const db = wx.cloud.database()
    console.log('BYU',DB,id,status)
    db.collection(DB).doc(id).update({
      data: {
        status: status
      },
      success: res => {
        wx.showToast({
          title: '已添加',
        })
        console.error('[数据库] [更新记录] 成功：')
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  }
}

export {
  DBupdata
}