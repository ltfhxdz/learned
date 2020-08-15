var englishJson = require('/../data/english.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upArray: ["一年级上册", "二年级上册", "三年级上册", "四年级上册", "五年级上册", "六年级上册"],
    downArray: ["一年级下册", "二年级下册", "三年级下册", "四年级下册", "五年级下册", "六年级下册"],
    isMark: true,
    markSelectArray: [],
    historySelectArray: []
  },


  history: function () {
    let markString = wx.getStorageSync('englishHistoryList');
    if (markString == "") {
      wx.showToast({
        title: '点击词语，进行标记',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      this.setData({
        historyShow: true,
        wordShow: false,
        writeShow: false,
        classShow: false,
        historyList: this.getMarkList('englishHistoryList')
      })
    }
  },


  removeHistory: function () {
    if (this.data.historySelectArray.length == 0) {
      wx.showToast({
        title: '点击词语，进行删除',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      this.removeSub('englishHistoryList');

      //清空标记选择数组
      this.data.historySelectArray = [];

      this.setData({
        historyShow: false,
        wordShow: this.getWordShow(),
        classShow: true,
        wordList: this.getMarkWordList()
      })
    }
  },

  historyCancel: function () {
    this.data.historySelectArray = [];
    this.setData({
      historyShow: false,
      wordShow: this.getWordShow(),
      classShow: true,
      wordList: this.getMarkWordList()
    })
  },

  history1Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select1';
    this.setHistorySelectArray(index, selectIndex);

    this.setData({
      historyShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      historyList: this.getHistorySelectArray()
    })
  },

  history2Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select2';
    this.setHistorySelectArray(index, selectIndex);

    this.setData({
      historyShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      historyList: this.getHistorySelectArray()
    })
  },

  history3Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select3';
    this.setHistorySelectArray(index, selectIndex);

    this.setData({
      historyShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      historyList: this.getHistorySelectArray()
    })
  },

  history4Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select4';
    this.setHistorySelectArray(index, selectIndex);

    this.setData({
      historyShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      historyList: this.getHistorySelectArray()
    })
  },


  setHistorySelectArray: function (index, selectIndex) {
    let markList = this.getMarkList('englishHistoryList');
    if (this.data.historySelectArray.length == 0) {
      for (let x in markList) {
        let markSelectMap = {};
        if (typeof (markList[x].mark1) != "undefined") {
          markSelectMap['select1'] = 0
        }
        if (typeof (markList[x].mark2) != "undefined") {
          markSelectMap['select2'] = 0
        }
        this.data.historySelectArray.push(markSelectMap);
      }
    }

    for (let x in this.data.historySelectArray) {
      if (x == index) {
        if (this.data.historySelectArray[x][selectIndex] == 0) {
          this.data.historySelectArray[x][selectIndex] = 1
        } else if (this.data.historySelectArray[x][selectIndex] == 1) {
          this.data.historySelectArray[x][selectIndex] = 0
        }
      }
    }
  },

  getHistorySelectArray: function () {
    let markList = this.getMarkList('englishHistoryList');
    for (let x in markList) {
      if (this.data.historySelectArray[x]['select1'] == 1) {
        markList[x]['select1'] = x;
      }
      if (this.data.historySelectArray[x]['select2'] == 1) {
        markList[x]['select2'] = x;
      }
      if (this.data.historySelectArray[x]['select3'] == 1) {
        markList[x]['select3'] = x;
      }
      if (this.data.historySelectArray[x]['select4'] == 1) {
        markList[x]['select4'] = x;
      }
    }
    return markList;
  },

  getHistoryButtonShow: function () {
    let markString = wx.getStorageSync('englishHistoryList');
    if (markString == "") {
      return false;
    } else {
      return true;
    }
  },



  setMarkSelectArray: function (index, selectIndex) {
    let markList = this.getMarkList('englishMarkList');
    if (this.data.markSelectArray.length == 0) {
      for (let x in markList) {
        let markSelectMap = {};
        if (typeof (markList[x].mark1) != "undefined") {
          markSelectMap['select1'] = 0
        }
        if (typeof (markList[x].mark2) != "undefined") {
          markSelectMap['select2'] = 0
        }
        this.data.markSelectArray.push(markSelectMap);
      }
    }

    for (let x in this.data.markSelectArray) {
      if (x == index) {
        if (this.data.markSelectArray[x][selectIndex] == 0) {
          this.data.markSelectArray[x][selectIndex] = 1
        } else if (this.data.markSelectArray[x][selectIndex] == 1) {
          this.data.markSelectArray[x][selectIndex] = 0
        }
      }
    }
  },

  getMarkSelectArray: function () {
    let markList = this.getMarkList('englishMarkList');
    for (let x in markList) {
      if (this.data.markSelectArray[x]['select1'] == 1) {
        markList[x]['select1'] = x;
      }
      if (this.data.markSelectArray[x]['select2'] == 1) {
        markList[x]['select2'] = x;
      }
      if (this.data.markSelectArray[x]['select3'] == 1) {
        markList[x]['select3'] = x;
      }
      if (this.data.markSelectArray[x]['select4'] == 1) {
        markList[x]['select4'] = x;
      }
    }
    return markList;
  },

  mark1Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select1';
    this.setMarkSelectArray(index, selectIndex);

    this.setData({
      markShow: true,
      wordShow: false,
      classShow: false,
      markList: this.getMarkSelectArray()
    })
  },

  mark2Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select2';
    this.setMarkSelectArray(index, selectIndex);

    this.setData({
      markShow: true,
      wordShow: false,
      classShow: false,
      markList: this.getMarkSelectArray()
    })
  },

  notMarkListAddWord: function (index, wordIndex, key) {
    let wordList = this.getWordList(this.getResultArray()[0]);

    for (let x in wordList) {
      if (x == index) {
        let term = wx.getStorageSync('englishTerm');
        let lesson = wx.getStorageSync('englishLesson');
        let termlession = term + lesson;

        let markArray = [];
        markArray.push(wordList[x][wordIndex]);

        let markMap = {};
        markMap['termlession'] = termlession;
        markMap['mark'] = markArray;

        let markList = [];
        markList.push(markMap);
        wx.setStorageSync(key, JSON.stringify(markList));
        break;
      }
    }
  },

  setMarkWordList: function (index, wordIndex, key) {
    let markString = wx.getStorageSync(key);
    if (markString == "") {
      this.notMarkListAddWord(index, wordIndex, key);
    } else {
      let term = wx.getStorageSync('englishTerm');
      let lesson = wx.getStorageSync('englishLesson');
      let termlession = term + lesson;

      let markList = JSON.parse(markString);
      let termlessionFlag = 0;
      let markFlag = 0;
      let wordList = this.getWordList(this.getResultArray()[0]);
      for (let x in wordList) {
        if (x == index) {
          for (let y in markList) {
            if (markList[y].termlession == termlession) {
              termlessionFlag = 1;
              let markArray = markList[y].mark;
              for (let z in markArray) {
                if (wordList[x][wordIndex] == markArray[z]) {
                  //如果找到，进行删除处理
                  markFlag = 1;
                  if ('englishMarkList' == key) {
                    markArray.splice(z, 1);
                    if (markArray.length == 0) {
                      //如果数组长度为0，删除termlession
                      markList.splice(y, 1);
                      if (markList.length == 0) {
                        wx.removeStorageSync(key);
                      } else {
                        wx.setStorageSync(key, JSON.stringify(markList));
                      }
                    } else {
                      wx.setStorageSync(key, JSON.stringify(markList));
                    }
                  }

                  break;
                }
              }
            }
          }
        }
      }

      if (markFlag == 0) {
        //当前词语，没有标记过
        for (let x in wordList) {
          if (x == index) {
            for (let y in markList) {
              if (markList[y].termlession == termlession) {
                markList[y]['mark'].push(wordList[x][wordIndex]);
                wx.setStorageSync(key, JSON.stringify(markList));
                break;
              }
            }
          }
        }
      }

      if (termlessionFlag == 0) {
        //当前课文，没有标记过
        for (let x in wordList) {
          if (x == index) {
            let markArray = [];
            markArray.push(wordList[x][wordIndex]);

            let markMap = {};
            markMap['termlession'] = termlession;
            markMap['mark'] = markArray;

            markList.push(markMap);
            wx.setStorageSync(key, JSON.stringify(markList));
            break;
          }
        }
      }

    }
  },

  getMarkWordList: function () {
    let wordList = this.getWordList(this.getResultArray()[0]);
    let markString = wx.getStorageSync('englishMarkList');
    let markList = [];
    if (markString != '') {
      markList = JSON.parse(markString);
    }
    let term = wx.getStorageSync('englishTerm');
    let lesson = wx.getStorageSync('englishLesson');
    let termlession = term + lesson;

    for (let x in markList) {
      if (markList[x].termlession == termlession) {
        let markArray = markList[x].mark;
        for (let y in markArray) {
          for (let z in wordList) {
            if (markArray[y] == wordList[z].word1) {
              wordList[z]['mark1'] = z;
            } else if (markArray[y] == wordList[z].word2) {
              wordList[z]['mark2'] = z;
            }
          }
        }
        break;
      }
    }
    return wordList;
  },

  word1Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let wordIndex = 'word1';
    this.setMarkWordList(index, wordIndex, 'englishMarkList');
    this.setMarkWordList(index, wordIndex, 'englishHistoryList');

    this.setData({
      wordList: this.getMarkWordList(),
      historyButtonShow: this.getHistoryButtonShow()
    });
  },

  word2Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let wordIndex = 'word2';
    this.setMarkWordList(index, wordIndex, 'englishMarkList');
    this.setMarkWordList(index, wordIndex, 'englishHistoryList');

    this.setData({
      wordList: this.getMarkWordList(),
      historyButtonShow: this.getHistoryButtonShow()
    });

  },

  getMarkList: function (key) {
    let markString = wx.getStorageSync(key);
    let markSourceList = JSON.parse(markString);
    let markSourceArray = [];

    for (let x in markSourceList) {
      let markArray = markSourceList[x].mark;
      for (let y in markArray) {
        markSourceArray.push(markArray[y]);
      }
    }

    let markList = [];
    let markMap = {};
    let m = 0;
    for (let x in markSourceArray) {
      m = m + 1;
      if (m == 1) {
        markMap['mark1'] = markSourceArray[x];
      } else if (m == 2) {
        markMap['mark2'] = markSourceArray[x];
        markList.push(markMap);
        m = 0;
        markMap = {};
      }
    }

    if (markList.length * 2 < markSourceArray.length) {
      if (typeof (markSourceArray[markList.length * 2]) != "undefined") {
        markMap["mark1"] = markSourceArray[markList.length * 2];
      }

      if (typeof (markSourceArray[markList.length * 2 + 1]) != "undefined") {
        markMap["mark2"] = markSourceArray[markList.length * 2 + 1];
      }

      markList.push(markMap);
    }
    return markList;
  },

  mark: function () {
    let markString = wx.getStorageSync('englishMarkList');
    if (markString == "") {
      wx.showToast({
        title: '点击单词，进行标记',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      this.setData({
        markShow: true,
        wordShow: false,
        classShow: false,
        markList: this.getMarkList('englishMarkList')
      })
    }
  },

  getDeleteMarkList: function () {
    if (this.data.markSelectArray.length == 0) {
      return;
    }
    let markList = this.getMarkList('englishMarkList');
    let deleteMarkList = [];
    for (let x in markList) {
      if (this.data.markSelectArray[x]['select1'] == 1) {
        if (typeof (markList[x].mark1) != "undefined") {
          deleteMarkList.push(markList[x].mark1);
        }
      }
      if (this.data.markSelectArray[x]['select2'] == 1) {
        if (typeof (markList[x].mark2) != "undefined") {
          deleteMarkList.push(markList[x].mark2);
        }
      }
    }

    return deleteMarkList;
  },

  getDeleteHistoryList: function () {
    if (this.data.historySelectArray.length == 0) {
      return;
    }
    let markList = this.getMarkList('englishHistoryList');
    let deleteMarkList = [];
    for (let x in markList) {
      if (this.data.historySelectArray[x]['select1'] == 1) {
        if (typeof (markList[x].mark1) != "undefined") {
          deleteMarkList.push(markList[x].mark1);
        }
      }
      if (this.data.historySelectArray[x]['select2'] == 1) {
        if (typeof (markList[x].mark2) != "undefined") {
          deleteMarkList.push(markList[x].mark2);
        }
      }
    }

    return deleteMarkList;
  },

  markCancel: function () {
    this.data.markSelectArray = [];
    this.setData({
      markShow: false,
      wordShow: true,
      classShow: true,
      wordList: this.getMarkWordList()
    })
  },

  removeMark: function () {
    if (this.data.markSelectArray.length == 0) {
      wx.showToast({
        title: '点击单词，进行删除',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      this.removeSub('englishMarkList');

      //清空标记选择数组
      this.data.markSelectArray = [];

      this.setData({
        markShow: false,
        wordShow: true,
        classShow: true,
        wordList: this.getMarkWordList()
      })
    }
  },

  removeSub: function (key) {
    let deleteMarkList;
    if (key == 'englishMarkList') {
      deleteMarkList = this.getDeleteMarkList();
    } else {
      deleteMarkList = this.getDeleteHistoryList();
    }

    let markString = wx.getStorageSync(key);
    let markList = JSON.parse(markString);
    for (let x in deleteMarkList) {
      for (let y in markList) {
        let markArray = markList[y].mark;
        for (let z in markArray) {
          if (deleteMarkList[x] == markArray[z]) {
            markArray.splice(z, 1);
          }
        }
      }
    }

    let newMarkList = [];
    for (let x in markList) {
      if (markList[x].mark.length > 0) {
        newMarkList.push(markList[x]);
      }
    }
    if (newMarkList.length == 0) {
      wx.removeStorageSync(key);
    } else {
      wx.setStorageSync(key, JSON.stringify(newMarkList));
    }
  },

  select: function (e) {
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
      classShow: false,
      termList: termList
    })
  },

  termCancel: function (e) {
    let lesson = wx.getStorageSync('englishLesson');
    let wordShow = false;
    let classShow = false;
    if (lesson != '') {
      wordShow = true;
      classShow = true;
    }

    this.setData({
      termShow: false,
      wordShow: wordShow,
      classShow: classShow
    })
  },

  previous: function (e) {
    let term = wx.getStorageSync('englishTerm');
    let lesson = wx.getStorageSync('englishLesson');
    let lessonIndex = 0;
    let termIndex = 0;

    if (term == '' || lesson == '') {
      return;
    }

    let json = englishJson.englishJson;

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

      for (var k in termArray) {
        if (term == termArray[k]) {
          termIndex = k;
          break;
        }
      }
      if (termIndex == 0) {

      } else {
        let term = termArray[parseInt(termIndex) - 1];
        wx.setStorageSync('englishTerm', term);
        let lesson = '';
        for (var k in json) {
          if (json[k].term == term) {
            var wordList = json[k].wordList;
            lesson = wordList[wordList.length - 1].type;
            wx.setStorageSync('englishLesson', lesson);
          }
        }

        this.setData({
          term: term,
          lesson: lesson,
          wordShow: this.getWordShow(),
          wordList: this.getMarkWordList()
        })
      }

    } else {
      lesson = lessonArray[parseInt(lessonIndex) - 1];
      wx.setStorageSync('englishLesson', lesson);

      this.setData({
        term: term,
        lesson: lesson,
        wordShow: this.getWordShow(),
        wordList: this.getMarkWordList()
      })
    }
  },

  next: function (e) {
    let term = wx.getStorageSync('englishTerm');
    let lesson = wx.getStorageSync('englishLesson');
    let lessonIndex = 0;
    let termIndex = 0;

    if (term == '' || lesson == '') {
      return;
    }

    let json = englishJson.englishJson;

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

      for (var k in termArray) {
        if (term == termArray[k]) {
          termIndex = k;
          break;
        }
      }
      if (termIndex == termArray.length - 1) {

      } else {
        let term = termArray[parseInt(termIndex) + 1];
        wx.setStorageSync('englishTerm', term);
        let lesson = '';
        for (var k in json) {
          if (json[k].term == term) {
            var wordList = json[k].wordList;
            lesson = wordList[0].type;
            wx.setStorageSync('englishLesson', lesson);
          }
        }

        this.setData({
          term: term,
          lesson: lesson,
          wordShow: this.getWordShow(),
          wordList: this.getMarkWordList()
        })
      }

    } else {
      lesson = lessonArray[parseInt(lessonIndex) + 1];
      wx.setStorageSync('englishLesson', lesson);

      this.setData({
        term: term,
        lesson: lesson,
        wordShow: this.getWordShow(),
        wordList: this.getMarkWordList()
      })
    }

  },

  getWordShow: function () {

    let wordList = this.getWordList(this.getResultArray()[0]);
    let wordShow = false;
    if (this.getResultArray()[0] != '') {
      wordShow = true;
    }
    return wordShow;
  },

  term1Method: function (e) {
    let json = englishJson.englishJson;
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

  term2Method: function (e) {
    let json = englishJson.englishJson;
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

  lesson1Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson1']) == "undefined") {
      return;
    }
    wx.setStorageSync('englishLesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson1']);
    wx.setStorageSync('englishTerm', this.data.term);
    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      term: this.data.term,
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson1'],
      wordList: this.getMarkWordList()
    })
  },

  lesson2Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson2']) == "undefined") {
      return;
    }
    wx.setStorageSync('englishLesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson2']);
    wx.setStorageSync('englishTerm', this.data.term);
    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      term: this.data.term,
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson2'],
      wordList: this.getMarkWordList()
    })
  },

  lesson3Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson3']) == "undefined") {
      return;
    }

    wx.setStorageSync('englishLesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson3']);
    wx.setStorageSync('englishTerm', this.data.term);
    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      term: this.data.term,
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson3'],
      wordList: this.getMarkWordList()
    })
  },

  lessonCancel: function (e) {
    let lesson = wx.getStorageSync('englishLesson');
    let wordShow = false;
    let classShow = false;
    if (lesson != '') {
      wordShow = true;
      classShow = true;
    }

    this.setData({
      lessonShow: false,
      wordShow: wordShow,
      classShow: classShow
    })
  },

  getResultArray: function () {
    let term = wx.getStorageSync('englishTerm');
    let lesson = wx.getStorageSync('englishLesson');

    if (term != "" && lesson != "") {
      let json = englishJson.englishJson;
      var wordArray = [];
      for (var k in json) {
        if (term == json[k].term) {
          let wordList = json[k].wordList;
          for (let x in wordList) {
            if (lesson == wordList[x].type) {
              wordArray = wordList[x].word;
              break;
            }
          }
        }
      }

      let resultArray = [];
      resultArray[0] = wordArray;
      resultArray[1] = term;
      resultArray[2] = lesson;
      return resultArray;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let term = wx.getStorageSync('englishTerm');
    let lesson = wx.getStorageSync('englishLesson');
    if (term == '' || lesson == '') {
      return;
    }

    //初始化标记历史
    this.initHistory();

    this.setData({
      previousShow: true,
      nextShow: true,
      classShow: true,
      wordShow: this.getWordShow(),
      wordList: this.getMarkWordList(),
      term: this.getResultArray()[1],
      lesson: this.getResultArray()[2],
      historyButtonShow: this.getHistoryButtonShow()
    })
  },

  
  initHistory:function(){

    let historyFlag = wx.getStorageSync('englishHistoryFlag');
    if(historyFlag == '1'){
      return;
    }

    let markString = wx.getStorageSync('englishMarkList');
    if (markString != "") {
      wx.setStorageSync('englishHistoryList',markString);
    }
    
    wx.setStorageSync('englishHistoryFlag','1');
  },



  getWordList: function (wordArray) {
    let wordList = [];
    let wordItem = {};
    let n = 0;
    for (var x in wordArray) {
      n++;
      if (n == 1) {
        wordItem['word1'] = wordArray[x];
      } else if (n == 2) {
        n = 0;
        wordItem['word2'] = wordArray[x];
        wordList.push(wordItem);
        wordItem = {};
      }
    }

    if (wordList.length * 2 < wordArray.length) {
      if (typeof (wordArray[wordList.length * 2]) != "undefined") {
        wordItem["word1"] = wordArray[wordList.length * 2];
      }

      if (typeof (wordArray[wordList.length * 2 + 1]) != "undefined") {
        wordItem["word2"] = wordArray[wordList.length * 2 + 1];
      }

      wordList.push(wordItem);
    }

    return wordList;
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  /**
   * 允许用户点击右上角分享给朋友
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