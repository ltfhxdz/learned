var oneWordJson = require('/../data/word.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upArray: ["一年级上册", "二年级上册", "三年级上册", "四年级上册", "五年级上册", "六年级上册"],
    downArray: ["一年级下册", "二年级下册", "三年级下册", "四年级下册", "五年级下册", "六年级下册"],
  },

  select: function(e) {
    let termList = [{
        "term1": "一年级上册",
        "term2": "一年级下册"
      },
      {
        "term1": "二年级上册",
        "term2": "二年级下册"
      },
      {
        "term1": "三年级上册",
        "term2": "三年级下册"
      },
      {
        "term1": "四年级上册",
        "term2": "四年级下册"
      },
      {
        "term1": "五年级上册",
        "term2": "五年级下册"
      },
      {
        "term1": "六年级上册",
        "term2": "六年级下册"
      }
    ];

    this.setData({
      termShow: true,
      termList: termList
    })
  },

  termCancel: function(e) {
    this.setData({
      termShow: false
    })
  },

  previous: function(e) {

  },

  next: function(e) {

  },

  //数组去重
  uniq: function(array) {
    var temp = []; 
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  },

  term1Method: function(e) {
    console.log("1111111111:"+this.data.upArray[e.currentTarget.dataset.index]);
    let json = oneWordJson.oneWordJson;
    let typeArray = [];
    for (var k in json) {
      var term = json[k].term;
      console.log('term=' + term);
      if (term == this.data.upArray[e.currentTarget.dataset.index]) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          console.log('x=' + wordList[x].type + ',' + wordList[x].word);
          typeArray.push(wordList[x].type);
        }
      }
    }
    console.log(typeArray);
    let newTypeArray = this.uniq(typeArray);
    console.log(newTypeArray);

    let lessonList = [{
      "lesson1": "第1课",
      "lesson2": "第2课",
      "lesson3": "第3课"
    }, {
      "lesson1": "第4课",
      "lesson2": "第5课",
      "lesson3": "第6课"
    }, {
      "lesson1": "第7课",
      "lesson2": "第8课",
      "lesson3": "第9课"
    }, {
      "lesson1": "第10课",
      "lesson2": "第11课",
      "lesson3": "第12课"
    }, {
      "lesson1": "第13课",
      "lesson2": "第14课",
      "lesson3": "第15课"
    }, {
      "lesson1": "第16课",
      "lesson2": "第17课",
      "lesson3": "第18课"
    }, {
      "lesson1": "第19课",
      "lesson2": "第20课",
      "lesson3": "第21课"
    }, {
      "lesson1": "第22课",
      "lesson2": "第23课",
      "lesson3": "第24课"
    }, {
      "lesson1": "第25课",
      "lesson2": "第26课",
      "lesson3": "第27课"
    }, ];
    // this.setData({
    //   termShow: false,
    //   lessonShow: true,
    //   lessonList: lessonList
    // })
  },

  term2Method: function(e) {
    console.log("222222222:"+this.data.downArray[e.currentTarget.dataset.index]);
    let json = oneWordJson.oneWordJson;
    let typeArray = [];
    for (var k in json) {
      var term = json[k].term;
      console.log('term=' + term);
      if (term == this.data.downArray[e.currentTarget.dataset.index]) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          console.log('x=' + wordList[x].type + ',' + wordList[x].word);
          typeArray.push(wordList[x].type);
        }
      }
    }
    console.log(typeArray);
    let newTypeArray = this.uniq(typeArray);
    console.log(newTypeArray);

    let lessonList = [{
      "lesson1": "第1课",
      "lesson2": "第2课",
      "lesson3": "第3课"
    }, {
      "lesson1": "第4课",
      "lesson2": "第5课",
      "lesson3": "第6课"
    }, {
      "lesson1": "第7课",
      "lesson2": "第8课",
      "lesson3": "第9课"
    }, {
      "lesson1": "第10课",
      "lesson2": "第11课",
      "lesson3": "第12课"
    }, {
      "lesson1": "第13课",
      "lesson2": "第14课",
      "lesson3": "第15课"
    }, {
      "lesson1": "第16课",
      "lesson2": "第17课",
      "lesson3": "第18课"
    }, {
      "lesson1": "第19课",
      "lesson2": "第20课",
      "lesson3": "第21课"
    }, {
      "lesson1": "第22课",
      "lesson2": "第23课",
      "lesson3": "第24课"
    }, {
      "lesson1": "第25课",
      "lesson2": "第26课",
      "lesson3": "第27课"
    }, ];
    // this.setData({
    //   termShow: false,
    //   lessonShow: true,
    //   lessonList: lessonList
    // })
  },

  lesson1Method: function(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      lessonShow: false
    })
  },

  lesson2Method: function(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      lessonShow: false
    })
  },

  lesson3Method: function(e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      lessonShow: false
    })
  },

  lessonCancel: function(e) {
    this.setData({
      lessonShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})