// components/mz-home/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否显示面板指示点
    indicatorDots: false,
    // 是否自动切换
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000,
    banners: [
      {
        id: 3,
        img: "/images/school/a.jpg",
        url: 'http://up.mcyt.net/?down/45768.mp3',
        name: '曖昧ナ希望/氷雨 - 帆足圭吾'
      },
      {
        id: 1,
        img: '/images/school/b.jpg',
        url: 'http://up.mcyt.net/?down/41218.mp3',
        name: '泡沫 哀のまほろば'
      },
      {
        id: 2,
        img: '/images/school/c.jpg',
        url: 'http://up.mcyt.net/?down/41218.mp3',
        name: '泡沫 哀のまほろば'
      }
    ],
    hotgoods: [
      {
        "name": "书籍",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timg[3].jpg",
        "num":0
      },
      {
        "name": "电器",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgBQB2ADY4.jpg",
        "num": 1
      },
      {
        "name": "桌子",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgEAT3PRHU.jpg",
        "num": 2
      },
      {
        "name": "玩偶",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgJBY0ZFE8.jpg",
        "num": 3
      },
      {
        "name": "其他",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timgPZ2T74LW.jpg",
        "num": 4
      },
      {
        "name": "电脑",
        "pic_url": "cloud://mz-1320545387.6d7a-mz-1320545387/分类/timg2FOTJZD7.jpg",
        "num": 5
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSort(event){
      // console.log(event)
      const arr = event.currentTarget.dataset.bindex
      console.log(arr)
      const sort = this.data.hotgoods[arr].name
      console.log(sort)
      wx.navigateTo({
        url:`/pages/sort/sort?sort=${sort}`,
      })
    }
  }
})
