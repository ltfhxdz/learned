Page({
  data: {
    //主播
    //基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，缺少2,默认为度小美 
    //精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，
    anchorArray: ['小美', '小宇', '逍遥', '丫丫'],

    //语速，取值0-15，默认为5中语速
    speedArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

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
      anchor: this.data.anchorArray[wx.getStorageSync('anchor')],
      speed: wx.getStorageSync('speed'),
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