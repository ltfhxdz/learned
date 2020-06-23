var oneWordJson = require('/../data/word.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upArray: ["一年级上册", "二年级上册", "三年级上册", "四年级上册", "五年级上册", "六年级上册"],
    downArray: ["一年级下册", "二年级下册", "三年级下册", "四年级下册", "五年级下册", "六年级下册"],
    lessonList: []
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
      wordShow: false,
      termList: termList
    })
  },

  termCancel: function(e) {
    this.setData({
      termShow: false
    })
  },

  //数组去重
  unique: function(array) {
    var temp = []; 
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  },

  previous: function(e) {
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    console.log(term);
    console.log(lesson);

    if (term == '' || lesson == ''){
      return;
    }

    let json = oneWordJson.oneWordJson;
    let termArray = [];
    for (var k in json) {
      termArray.push(json[k].term);
    }

    let typeArray = [];
    for (var k in json) {
      if (json[k].term == term) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          typeArray.push(wordList[x].type);
        }
        break;
      }
    }
    termArray = this.unique(termArray);
    console.log(termArray);
    console.log(typeArray);

    let index = 0;
    for (var k in typeArray) {
      if (lesson == typeArray[k]){
        index  = k;
        break;
      }
    }

    console.log(index);
    if (index == 0){
      //选择上一册
    } else {
      lesson = typeArray[index - 1];
      wx.setStorageSync('lesson', lesson);
      let name = '';
      for (var k in json) {
        if (json[k].term == term) {
          var wordList = json[k].wordList;
          for (let x in wordList) {
            if (lesson == wordList[x].type ){
              name = wordList[x].name;
              console.log(name);
              break;
            }
          }
        }
      }

      console.log(term);
      console.log(lesson);
      console.log(name);

      this.setData({
        term: term,
        lesson: lesson,
        name: name,
        wordList: this.getWordList(this.getResultArray()[0]),
        writeList: this.getWriteList(this.getResultArray()[1])
      })
    }
  },

  next: function(e) {

  },

  term1Method: function(e) {
    let json = oneWordJson.oneWordJson;
    let typeArray = [];
    for (var k in json) {
      var term = json[k].term;
      if (term == this.data.upArray[e.currentTarget.dataset.index]) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          typeArray.push(wordList[x].type);
        }
        break;
      }
    }

    let lessonList = [];
    let lessonItem = {};
    let m = 0;

    for (let x in typeArray) {
      m++;
      if (m == 1) {
        lessonItem["lesson1"] = typeArray[x];
      } else if (m == 2) {
        lessonItem["lesson2"] = typeArray[x];
      } else if (m == 3) {
        lessonItem["lesson3"] = typeArray[x];
        lessonList.push(lessonItem);
        m = 0;
        lessonItem = {};
      }
    }

    if (lessonList.length < typeArray.length) {
      lessonItem["lesson1"] = typeArray[lessonList.length * 3];
      lessonItem["lesson2"] = typeArray[lessonList.length * 3 + 1];
      lessonList.push(lessonItem);
    }

    this.data.lessonList = lessonList;
    wx.setStorageSync('term', this.data.upArray[e.currentTarget.dataset.index]);
    this.setData({
      termShow: false,
      lessonShow: true,
      term: this.data.upArray[e.currentTarget.dataset.index],
      lessonList: lessonList
    })
  },

  term2Method: function(e) {
    let json = oneWordJson.oneWordJson;
    let typeArray = [];
    for (var k in json) {
      var term = json[k].term;
      if (term == this.data.downArray[e.currentTarget.dataset.index]) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          typeArray.push(wordList[x].type);
        }
        break;
      }
    }

    let lessonList = [];
    let lessonItem = {};
    let m = 0;

    for (let x in typeArray) {
      m++;
      if (m == 1) {
        lessonItem["lesson1"] = typeArray[x];
      } else if (m == 2) {
        lessonItem["lesson2"] = typeArray[x];
      } else if (m == 3) {
        lessonItem["lesson3"] = typeArray[x];
        lessonList.push(lessonItem);
        m = 0;
        lessonItem = {};
      }
    }

    if (lessonList.length < typeArray.length) {
      lessonItem["lesson1"] = typeArray[lessonList.length * 3];
      lessonItem["lesson2"] = typeArray[lessonList.length * 3 + 1];
      lessonList.push(lessonItem);
    }
    this.data.lessonList = lessonList;
    wx.setStorageSync('term', this.data.downArray[e.currentTarget.dataset.index]);
    this.setData({
      termShow: false,
      lessonShow: true,
      term: this.data.downArray[e.currentTarget.dataset.index],
      lessonList: lessonList
    })
  },

  getName: function() {

    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    let json = oneWordJson.oneWordJson;
    let name = '';
    for (var k in json) {
      if (term == json[k].term) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          if (lesson == wordList[x].type) {
            name = wordList[x].name;
            break;
          }
        }
      }
    }
    return name;
  },

  lesson1Method: function(e) {
    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson1']);
    this.setData({
      lessonShow: false,
      wordShow: true,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson1'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lesson2Method: function(e) {
    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson2']);
    this.setData({
      lessonShow: false,
      wordShow: true,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson2'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lesson3Method: function(e) {
    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson3']);
    this.setData({
      lessonShow: false,
      wordShow: true,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson3'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lessonCancel: function(e) {
    this.setData({
      lessonShow: false
    })
  },

  getResultArray: function() {
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');

    if (term != "" && lesson != "") {
      let json = oneWordJson.oneWordJson;
      let wordString = '';
      let wirteString = '';
      let name = '';
      let m = 0;
      for (var k in json) {
        if (term == json[k].term) {
          let wordList = json[k].wordList;
          for (let x in wordList) {
            if (lesson == wordList[x].type) {
              name = wordList[x].name;
              if (m == 0) {
                m = m + 1;
                wirteString = wordList[x].word;
              } else if (m == 1) {
                wordString = wordList[x].word;
              }
            }
          }
        }
      }

      var writeArray = wirteString.replace(/(.)(?=[^$])/g, "$1,").split(",");
      var wordArray = wordString.split(" ");
      let resultArray = [];
      resultArray[0] = wordArray;
      resultArray[1] = writeArray;
      resultArray[2] = term;
      resultArray[3] = name;
      resultArray[4] = lesson;
      return resultArray;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    if (term == '' || lesson == '') {
      return;
    }

    this.setData({
      wordShow: true,
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1]),
      term: this.getResultArray()[2],
      name: this.getResultArray()[3],
      lesson: this.getResultArray()[4]
    })
  },


  getWordList: function(wordArray) {
    let wordList = [];
    let wordItem = {};

    let n = 0;
    for (var x in wordArray) {
      n++;
      if (n == 1) {
        wordItem['word1'] = wordArray[x];
      } else if (n == 2) {
        wordItem['word2'] = wordArray[x];
      } else if (n == 3) {
        wordItem['word3'] = wordArray[x];
      } else if (n == 4) {
        n = 0;
        wordItem['word4'] = wordArray[x];
        wordList.push(wordItem);
        wordItem = {};
      }
    }


    if (wordList.length < wordArray.length) {
      wordItem["word1"] = wordArray[wordList.length * 4];
      wordItem["word2"] = wordArray[wordList.length * 4 + 1];
      wordItem["word3"] = wordArray[wordList.length * 4 + 2];
      wordItem["word4"] = wordArray[wordList.length * 4 + 3];
      wordList.push(wordItem);
    }

    return wordList;
  },

  getWriteList: function(writeArray) {

    let writeList = [];
    let writeItem = {};

    let n = 0;
    for (var x in writeArray) {
      n++;
      if (n == 1) {
        writeItem['write1'] = writeArray[x];
      } else if (n == 2) {
        writeItem['write2'] = writeArray[x];
      } else if (n == 3) {
        writeItem['write3'] = writeArray[x];
      } else if (n == 4) {
        writeItem['write4'] = writeArray[x];
      } else if (n == 5) {
        n = 0;
        writeItem['write5'] = writeArray[x];
        writeList.push(writeItem);
        writeItem = {};
      }
    }


    if (writeList.length < writeArray.length) {
      writeItem["write1"] = writeArray[writeList.length * 5];
      writeItem["write2"] = writeArray[writeList.length * 5 + 1];
      writeItem["write3"] = writeArray[writeList.length * 5 + 2];
      writeItem["write4"] = writeArray[writeList.length * 5 + 3];
      writeList.push(writeItem);
    }

    return writeList;
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