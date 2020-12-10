Page({
  data: {
    //主播
    //基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，缺少2,默认为度小美 
    //精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，
    anchorArray: ['小美', '小宇', '逍遥', '丫丫'],

    //语速，取值0-15，默认为5中语速
    speedArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

    //音调，取值0-15，默认为5中语调
    toneArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

    //音量，取值0-9，默认为5中音量
    volumeArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

  },

  toneMethod: function (e) {
    wx.setStorageSync('tone', e.detail.value);
    this.setData({
      tone: wx.getStorageSync('tone')
    })
  },

  volumeMethod: function (e) {
    wx.setStorageSync('volume', e.detail.value);
    this.setData({
      volume: wx.getStorageSync('volume')
    })
  },

  anchorMethod: function (e) {
    wx.setStorageSync('anchor', e.detail.value);
    this.setData({
      anchor: this.data.anchorArray[e.detail.value]
    })
  },

  speedMethod: function (e) {
    wx.setStorageSync('speed', e.detail.value);
    this.setData({
      speed: wx.getStorageSync('speed')
    })
  },

  onLoad: function () {

  },

  onShow: function () {
    this.setData({
      anchorIndex: wx.getStorageSync('anchor'),
      speedIndex: wx.getStorageSync('speed'),
      toneIndex: wx.getStorageSync('tone'),
      volumeIndex: wx.getStorageSync('volume'),
      anchor: this.data.anchorArray[wx.getStorageSync('anchor')],
      speed: wx.getStorageSync('speed'),
      tone: wx.getStorageSync('tone'),
      volume: wx.getStorageSync('volume'),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 允许用户右上角分享到朋友圈
   */
  onShareTimeline: function () {
    title: '听写小助手：字词是基础，助力孩子进步。'
  }

})