var oneWordJson = require('/../data/word.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upArray: ["一年级上册", "二年级上册", "三年级上册", "四年级上册", "五年级上册", "六年级上册"],
    downArray: ["一年级下册", "二年级下册", "三年级下册", "四年级下册", "五年级下册", "六年级下册"],
    lessonList: [],
    term: '',
    isrepeat: true
  },

  repeat:function(){

    let json = oneWordJson.oneWordJson;
    let souceArray = [];

    for (var k in json) {
      let wordList = json[k].wordList;
      for (var x in wordList) {
        let name = json[k].term + wordList[x].type;
        let souceMap = {};
        souceMap['name'] = name;
        souceMap['write'] = wordList[x].word;
        souceArray.push(souceMap);
      }
      if (json[k].term == '六年级下册') {
        break;
      }
    }

    for (var k in json) {
      let wordList = json[k].wordList;
      for (var x in wordList) {
        let name = json[k].term + wordList[x].type;
        for (let y in souceArray) {
          if (name == souceArray[y].name) {
            let souceMap = souceArray[y];
            if (souceMap['write'] != wordList[x].word) {
              souceMap['word'] = wordList[x].word;
            }
          }
        }
      }
    }

    console.log(souceArray);




    this.setData({
      isrepeat: !this.data.isrepeat
    })
  },

  mark: function () {

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
      writeShow: false,
      classShow: false,
      termList: termList
    })
  },

  termCancel: function(e) {
    this.setData({
      termShow: false,
      wordShow: true,
      writeShow: true,
      classShow: true
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
    let lessonIndex = 0;
    let termIndex = 0;

    if (term == '' || lesson == '') {
      return;
    }

    let json = oneWordJson.oneWordJson;

    let lessonArray = [];
    for (var k in json) {
      if (json[k].term == term) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          lessonArray.push(wordList[x].type);
        }
        break;
      }
    }

    for (var k in lessonArray) {
      if (lesson == lessonArray[k]) {
        lessonIndex = k;
        break;
      }
    }

    if (lessonIndex == 0) {
      //选择上一册
      let termArray = [];
      for (var k in json) {
        termArray.push(json[k].term);
      }
      termArray = this.unique(termArray);

      for (var k in termArray) {
        if (term == termArray[k]) {
          termIndex = k;
          break;
        }
      }
      if (termIndex == 0) {

      } else {
        let term = termArray[parseInt(termIndex) - 1];
        wx.setStorageSync('term', term);
        let name = '';
        let lesson = '';
        for (var k in json) {
          if (json[k].term == term) {
            var wordList = json[k].wordList;
            name = wordList[wordList.length - 1].name;
            lesson = wordList[wordList.length - 1].type;
            wx.setStorageSync('lesson', lesson);
          }
        }

        this.setData({
          term: term,
          lesson: lesson,
          name: name,
          wordShow: this.getWordShow(),
          writeShow: this.getWriteShow(),
          wordList: this.getWordList(this.getResultArray()[0]),
          writeList: this.getWriteList(this.getResultArray()[1])
        })
      }

    } else {
      lesson = lessonArray[parseInt(lessonIndex) - 1];
      wx.setStorageSync('lesson', lesson);
      let name = '';
      for (var k in json) {
        if (json[k].term == term) {
          var wordList = json[k].wordList;
          for (let x in wordList) {
            if (lesson == wordList[x].type) {
              name = wordList[x].name;
              break;
            }
          }
        }
      }

      this.setData({
        term: term,
        lesson: lesson,
        name: name,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        wordList: this.getWordList(this.getResultArray()[0]),
        writeList: this.getWriteList(this.getResultArray()[1])
      })
    }

  },

  next: function(e) {

    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    let lessonIndex = 0;
    let termIndex = 0;

    if (term == '' || lesson == '') {
      return;
    }

    let json = oneWordJson.oneWordJson;

    let lessonArray = [];
    for (var k in json) {
      if (json[k].term == term) {
        var wordList = json[k].wordList;
        for (let x in wordList) {
          lessonArray.push(wordList[x].type);
        }
        break;
      }
    }

    for (var k in lessonArray) {
      if (lesson == lessonArray[k]) {
        lessonIndex = k;
        break;
      }
    }

    if (lessonIndex == lessonArray.length - 1) {
      //选择下一册
      let termArray = [];
      for (var k in json) {
        termArray.push(json[k].term);
      }
      termArray = this.unique(termArray);

      for (var k in termArray) {
        if (term == termArray[k]) {
          termIndex = k;
          break;
        }
      }
      if (termIndex == termArray.length - 1) {

      } else {
        let term = termArray[parseInt(termIndex) + 1];
        wx.setStorageSync('term', term);
        let name = '';
        let lesson = '';
        for (var k in json) {
          if (json[k].term == term) {
            var wordList = json[k].wordList;
            name = wordList[0].name;
            lesson = wordList[0].type;
            wx.setStorageSync('lesson', lesson);
          }
        }

        this.setData({
          term: term,
          lesson: lesson,
          name: name,
          wordShow: this.getWordShow(),
          writeShow: this.getWriteShow(),
          wordList: this.getWordList(this.getResultArray()[0]),
          writeList: this.getWriteList(this.getResultArray()[1])
        })
      }

    } else {
      lesson = lessonArray[parseInt(lessonIndex) + 1];
      wx.setStorageSync('lesson', lesson);
      let name = '';
      for (var k in json) {
        if (json[k].term == term) {
          var wordList = json[k].wordList;
          for (let x in wordList) {
            if (lesson == wordList[x].type) {
              name = wordList[x].name;
              break;
            }
          }
        }
      }

      this.setData({
        term: term,
        lesson: lesson,
        name: name,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        wordList: this.getWordList(this.getResultArray()[0]),
        writeList: this.getWriteList(this.getResultArray()[1])
      })
    }

  },

  getWordShow: function() {

    let wordList = this.getWordList(this.getResultArray()[0]);
    let wordShow = false;
    if (this.getResultArray()[0] != '') {
      wordShow = true;
    }
    return wordShow;
  },

  getWriteShow: function() {
    let writeList = this.getWriteList(this.getResultArray()[1]);
    let writeShow = false;
    if (writeList.length > 0) {
      writeShow = true;
    }
    return writeShow;
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
    this.data.term = this.data.upArray[e.currentTarget.dataset.index];

    this.setData({
      termShow: false,
      lessonShow: true,
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
    this.data.term = this.data.downArray[e.currentTarget.dataset.index];
    this.setData({
      termShow: false,
      lessonShow: true,
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
    wx.setStorageSync('term', this.data.term);
    this.setData({
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson1'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lesson2Method: function(e) {
    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson2']);
    wx.setStorageSync('term', this.data.term);
    this.setData({
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson2'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lesson3Method: function(e) {
    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson3']);
    wx.setStorageSync('term', this.data.term);
    this.setData({
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson3'],
      wordList: this.getWordList(this.getResultArray()[0]),
      writeList: this.getWriteList(this.getResultArray()[1])
    })
  },

  lessonCancel: function(e) {
    this.setData({
      lessonShow: false,
      wordShow: true,
      writeShow: true,
      classShow: true
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
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
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
      if (typeof(wordArray[wordList.length * 4]) == "undefined") {

      } else if (!wordArray[wordList.length * 4] && typeof(wordArray[wordList.length * 4]) != "undefined" && wordArray[wordList.length * 4] != 0) {
        wordItem["word1"] = wordArray[wordList.length * 4];
      }

      if (typeof(wordArray[wordList.length * 4 + 1]) == "undefined") {

      } else {
        wordItem["word2"] = wordArray[wordList.length * 4 + 1];

      }

      if (typeof(wordArray[wordList.length * 4 + 2]) == "undefined") {

      } else {
        wordItem["word3"] = wordArray[wordList.length * 4 + 2];

      }

      if (typeof(wordArray[wordList.length * 4 + 3]) == "undefined") {

      } else {
        wordItem["word4"] = wordArray[wordList.length * 4 + 3];

      }

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