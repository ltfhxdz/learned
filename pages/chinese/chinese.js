var oneWordJson = require('/../data/word.js');
const manager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upArray: ["一年级上册", "二年级上册", "三年级上册", "四年级上册", "五年级上册", "六年级上册"],
    downArray: ["一年级下册", "二年级下册", "三年级下册", "四年级下册", "五年级下册", "六年级下册"],
    isrepeat: false,
    isMark: true,
    markSelectArray: [],
    historySelectArray: [],
    wordMusicList: [],
    wordMusicIndex: -1,
    isWordDictation: true,
    wordPlayStatus: true,
    writeMusicList: [],
    writeMusicIndex: -1,
    isWriteDictation: true,
    writePlayStatus: true,
    token: ''
  },

  initToken: function () {
    //听写小助手注册信息
    // let cuid = "22051802";
    // let client_id = "k0fmHrIjOFtPbVy8q96plyDa";
    // let client_secret = "syCjvVKHXsA9RG9UqNOCwTmeDfMRiZ4A";

    //百度demo注册信息
    let cuid = "123456PYTHON";
    let client_id = "4E1BG9lTnlSeIf1NQFlrSq6h";
    let client_secret = "544ca4657ba8002e3dea3ac2f5fdd241";
    let that = this;
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.token = res.data.access_token;
      }
    })
  },

  playWordMusic: function () {
    if (this.data.wordPlayStatus) {
      let wordMusicIndex = this.data.wordMusicIndex + 1;
      if (wordMusicIndex == this.data.wordMusicList.length) {
        this.setData({
          wordMusicIndex: -1,
          isWordDictation: true
        });
        return;
      } else {
        this.setData({
          wordMusicIndex: wordMusicIndex
        });
      }

      let text = this.data.wordMusicList[this.data.wordMusicIndex];
      let token = this.data.token;
      let that = this;

      manager.title = text;
      manager.epname = "专辑名称";
      manager.singer = "";
      // 设置了 src 之后会自动播放
      manager.src = this.getUrl(token, text);
      manager.onEnded(function () {
        setTimeout(function () {
          that.playWordMusic();
        }, that.getSpeed());
      });

      manager.onError((res) => {
        console.error(res);
      });

    }
  },

  getSpeed: function () {
    let speed = wx.getStorageSync('speed');
    return speed * 1000;
  },

  playWriteMusic: function () {
    if (this.data.writePlayStatus) {
      let writeMusicIndex = this.data.writeMusicIndex + 1;
      if (writeMusicIndex == this.data.writeMusicList.length) {
        this.setData({
          writeMusicIndex: -1,
          isWriteDictation: true
        });
        return;
      } else {
        this.setData({
          writeMusicIndex: writeMusicIndex
        });
      }

      let text = this.data.writeMusicList[this.data.writeMusicIndex];
      let token = this.data.token;
      let that = this;

      manager.title = text;
      manager.epname = "专辑名称";
      manager.singer = "";
      // 设置了 src 之后会自动播放
      manager.src = this.getUrl(token, text);


      manager.onEnded(function () {
        setTimeout(function () {
          that.playWriteMusic();
        }, that.getSpeed());
      });

      manager.onError((res) => {
        console.error(res);
      });

    }
  },

  dictationWord: function () {
    if (this.data.isWordDictation) {
      //播放    
      this.setData({
        isWordDictation: !this.data.isWordDictation,
        wordPlayStatus: true,
        writePlayStatus: false,
        isWriteDictation: true
      })

      this.playWordMusic();

    } else {
      manager.stop();
      //暂停
      this.setData({
        isWordDictation: !this.data.isWordDictation,
        wordPlayStatus: false
      })
    }
  },

  dictationWrite: function () {
    if (this.data.isWriteDictation) {
      //播放    
      this.setData({
        isWriteDictation: !this.data.isWriteDictation,
        writePlayStatus: true,
        wordPlayStatus: false,
        isWordDictation: true
      })

      this.playWriteMusic();

    } else {
      manager.stop();
      //暂停
      this.setData({
        isWriteDictation: !this.data.isWriteDictation,
        writePlayStatus: false
      })
    }
  },

  initWordMusicList: function () {
    let wordMusicList = [];
    let wordList = this.getWordList(this.getResultArray()[0]);
    for (let x in wordList) {
      if (typeof (wordList[x].word1) != "undefined") {
        wordMusicList.push(wordList[x].word1);
      }
      if (typeof (wordList[x].word2) != "undefined") {
        wordMusicList.push(wordList[x].word2);
      }
      if (typeof (wordList[x].word3) != "undefined") {
        wordMusicList.push(wordList[x].word3);
      }
      if (typeof (wordList[x].word4) != "undefined") {
        wordMusicList.push(wordList[x].word4);
      }
    }

    this.data.wordMusicList = wordMusicList;
  },


  initWriteMusicList: function () {
    let writeMusicList = [];
    let writeList = this.getWriteList(this.getResultArray()[1]);
    writeList = this.getNoRepeatWriteList(writeList);

    for (let x in writeList) {
      if (typeof (writeList[x].write1) != "undefined") {
        writeMusicList.push(writeList[x].write1);
      }
      if (typeof (writeList[x].write2) != "undefined") {
        writeMusicList.push(writeList[x].write2);
      }
      if (typeof (writeList[x].write3) != "undefined") {
        writeMusicList.push(writeList[x].write3);
      }
      if (typeof (writeList[x].write4) != "undefined") {
        writeMusicList.push(writeList[x].write4);
      }
      if (typeof (writeList[x].write5) != "undefined") {
        writeMusicList.push(writeList[x].write5);
      }
    }
    this.data.writeMusicList = writeMusicList;
  },



  getUrl: function (tok, text) {
    let tex = encodeURI(text);

    let cuid = "123456PYTHON";

    //主播
    let pre = this.getAnchor();

    //语速，取值0-15，默认为5中语速
    let spd = 1;

    //音调，取值0-15，默认为5中语调
    let pit = 5;

    //音量，取值0-9，默认为5中音量
    let vol = 5;

    //下载的文件格式, 3：mp3(default) 4： pcm-16k 5： pcm-8k 6. wav
    let aue = "3";

    //语种 中文 固定参数
    let lan = "zh";

    //固定参数
    let ctp = "1"
    let srcurl = "https://tsn.baidu.com/text2audio?tok=" + tok + "&tex=" + tex + "&per=" + pre + "&spd=" + spd + "&pit=" + pit + "&vol=" + vol + "&aue=" + aue + "&cuid=" + cuid + "&lan=" + lan + "&ctp=" + ctp;
    return srcurl;
  },

  //发音人选择, 基础音库：0为度小美，1为度小宇，3为度逍遥，4为度丫丫，
  //精品音库：5为度小娇，103为度米朵，106为度博文，110为度小童，111为度小萌，默认为度小美 
  getAnchor: function () {
    let pre = 0;

    let anchor = wx.getStorageSync('anchor');
    if (anchor == "0") {
      pre = 0;
    } else if (anchor == "1") {
      pre = 1;
    }
    if (anchor == "2") {
      pre = 3;
    }
    if (anchor == "3") {
      pre = 4;
    }
    return pre;
  },

  history: function () {
    let markString = wx.getStorageSync('historyList');
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
        historyList: this.getMarkList('historyList')
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
      let key = 'historyList';
      this.removeSub(key);
      //清空标记选择数组
      this.data.historySelectArray = [];
      let writeList = this.getWriteList(this.getResultArray()[1]);
      writeList = this.getNoRepeatWriteList(writeList);

      this.setData({
        historyShow: false,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        classShow: true,
        wordList: this.getMarkWordList('markList'),
        writeList: this.getMarkWriteList(writeList)
      })
    }
  },

  historyCancel: function () {
    this.data.historySelectArray = [];
    this.setData({
      historyShow: false,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      classShow: true,
      wordList: this.getMarkWordList('markList')
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
    let markList = this.getMarkList('historyList');
    if (this.data.historySelectArray.length == 0) {
      for (let x in markList) {
        let markSelectMap = {};
        if (typeof (markList[x].mark1) != "undefined") {
          markSelectMap['select1'] = 0
        }
        if (typeof (markList[x].mark2) != "undefined") {
          markSelectMap['select2'] = 0
        }
        if (typeof (markList[x].mark3) != "undefined") {
          markSelectMap['select3'] = 0
        }
        if (typeof (markList[x].mark4) != "undefined") {
          markSelectMap['select4'] = 0
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
    let markList = this.getMarkList('historyList');
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

  setMarkSelectArray: function (index, selectIndex) {
    let markList = this.getMarkList('markList');
    if (this.data.markSelectArray.length == 0) {
      for (let x in markList) {
        let markSelectMap = {};
        if (typeof (markList[x].mark1) != "undefined") {
          markSelectMap['select1'] = 0
        }
        if (typeof (markList[x].mark2) != "undefined") {
          markSelectMap['select2'] = 0
        }
        if (typeof (markList[x].mark3) != "undefined") {
          markSelectMap['select3'] = 0
        }
        if (typeof (markList[x].mark4) != "undefined") {
          markSelectMap['select4'] = 0
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
    let markList = this.getMarkList('markList');
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
      writeShow: false,
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
      writeShow: false,
      classShow: false,
      markList: this.getMarkSelectArray()
    })
  },

  mark3Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select3';
    this.setMarkSelectArray(index, selectIndex);

    this.setData({
      markShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      markList: this.getMarkSelectArray()
    })
  },

  mark4Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let selectIndex = 'select4';
    this.setMarkSelectArray(index, selectIndex);

    this.setData({
      markShow: true,
      wordShow: false,
      writeShow: false,
      classShow: false,
      markList: this.getMarkSelectArray()
    })
  },

  notMarkListAddWord: function (index, wordIndex, key) {
    let wordList = this.getWordList(this.getResultArray()[0]);

    for (let x in wordList) {
      if (x == index) {
        let term = wx.getStorageSync('term');
        let lesson = wx.getStorageSync('lesson');
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
      let term = wx.getStorageSync('term');
      let lesson = wx.getStorageSync('lesson');
      let termlession = term + lesson;

      let markList = JSON.parse(markString);
      let termlessionFlag = 0;
      let markFlag = 0;
      let wordList = this.getWordList(this.getResultArray()[0]);
      for (let x in wordList) {
        if (x == index) {
          if (typeof (wordList[x][wordIndex]) == "undefined") {
            return;
          }

          for (let y in markList) {
            if (markList[y].termlession == termlession) {
              termlessionFlag = 1;
              let markArray = markList[y].mark;
              for (let z in markArray) {
                if (wordList[x][wordIndex] == markArray[z]) {
                  //如果找到，进行删除处理
                  markFlag = 1;
                  if ('markList' == key) {
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

  getMarkWordList: function (key) {
    let wordList = this.getWordList(this.getResultArray()[0]);
    let markString = wx.getStorageSync(key);
    let markList = [];
    if (markString != '') {
      markList = JSON.parse(markString);
    }
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
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
            } else if (markArray[y] == wordList[z].word3) {
              wordList[z]['mark3'] = z;
            } else if (markArray[y] == wordList[z].word4) {
              wordList[z]['mark4'] = z;
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
    this.setMarkWordList(index, wordIndex, 'markList');
    this.setMarkWordList(index, wordIndex, 'historyList');

    this.setData({
      wordList: this.getMarkWordList('markList'),
      historyButtonShow: this.getHistoryButtonShow()
    });
  },

  word2Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let wordIndex = 'word2';
    this.setMarkWordList(index, wordIndex, 'markList');
    this.setMarkWordList(index, wordIndex, 'historyList');

    this.setData({
      wordList: this.getMarkWordList('markList'),
      historyButtonShow: this.getHistoryButtonShow()
    });

  },

  word3Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let wordIndex = 'word3';
    this.setMarkWordList(index, wordIndex, 'markList');
    this.setMarkWordList(index, wordIndex, 'historyList');

    this.setData({
      wordList: this.getMarkWordList('markList'),
      historyButtonShow: this.getHistoryButtonShow()
    });

  },

  word4Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let wordIndex = 'word4';
    this.setMarkWordList(index, wordIndex, 'markList');
    this.setMarkWordList(index, wordIndex, 'historyList');

    this.setData({
      wordList: this.getMarkWordList('markList'),
      historyButtonShow: this.getHistoryButtonShow()
    });

  },



  notMarkListAddWrite: function (index, writeIndex, key) {
    let writeList = this.getWriteList(this.getResultArray()[1]);
    for (let x in writeList) {
      if (x == index) {
        let term = wx.getStorageSync('term');
        let lesson = wx.getStorageSync('lesson');
        let termlession = term + lesson;

        let markArray = [];
        markArray.push(writeList[x][writeIndex]);

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


  setMarkWriteList: function (index, writeIndex, writeList, key) {
    let markString = wx.getStorageSync(key);
    if (markString == "") {
      this.notMarkListAddWrite(index, writeIndex, key);
    } else {
      let term = wx.getStorageSync('term');
      let lesson = wx.getStorageSync('lesson');
      let termlession = term + lesson;

      let markList = JSON.parse(markString);
      let termlessionFlag = 0;
      let markFlag = 0;
      for (let x in writeList) {
        if (x == index) {
          for (let y in markList) {
            if (markList[y].termlession == termlession) {
              termlessionFlag = 1;
              let markArray = markList[y].mark;
              for (let z in markArray) {
                if (writeList[x][writeIndex] == markArray[z]) {
                  //如果找到，进行删除处理
                  markFlag = 1;
                  if ('markList' == key) {
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
        for (let x in writeList) {
          if (x == index) {
            for (let y in markList) {
              if (markList[y].termlession == termlession) {
                markList[y]['mark'].push(writeList[x][writeIndex]);
                wx.setStorageSync(key, JSON.stringify(markList));
                break;
              }
            }
          }
        }
      }

      if (termlessionFlag == 0) {
        //当前课文，没有标记过
        for (let x in writeList) {
          if (x == index) {
            let markArray = [];
            markArray.push(writeList[x][writeIndex]);

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


  getMarkWriteList: function (writeList) {
    let markString = wx.getStorageSync('markList');
    let markList = [];
    if (markString != '') {
      markList = JSON.parse(markString);
    }
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    let termlession = term + lesson;

    for (let x in markList) {
      if (markList[x].termlession == termlession) {
        let markArray = markList[x].mark;
        for (let y in markArray) {
          for (let z in writeList) {
            if (markArray[y] == writeList[z].write1) {
              writeList[z]['mark1'] = z;
            } else if (markArray[y] == writeList[z].write2) {
              writeList[z]['mark2'] = z;
            } else if (markArray[y] == writeList[z].write3) {
              writeList[z]['mark3'] = z;
            } else if (markArray[y] == writeList[z].write4) {
              writeList[z]['mark4'] = z;
            } else if (markArray[y] == writeList[z].write5) {
              writeList[z]['mark5'] = z;
            }
          }
        }
        break;
      }
    }
    return writeList;
  },

  setRepeatMarkWriteList: function (index, writeIndex) {
    let writeList = this.getWriteList(this.getResultArray()[1]);
    if (this.data.isrepeat) {
      this.setMarkWriteList(index, writeIndex, writeList, 'markList');
      this.setMarkWriteList(index, writeIndex, writeList, 'historyList');


      this.setData({
        writeList: this.getMarkWriteList(writeList),
        historyButtonShow: this.getHistoryButtonShow()
      });
    } else {
      let noRepeatWriteList = this.getNoRepeatWriteList(writeList);
      this.setMarkWriteList(index, writeIndex, noRepeatWriteList, 'markList');
      this.setMarkWriteList(index, writeIndex, noRepeatWriteList, 'historyList');

      this.setData({
        writeList: this.getMarkWriteList(noRepeatWriteList),
        historyButtonShow: this.getHistoryButtonShow()
      });
    }
  },

  write1Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let writeIndex = 'write1';
    this.setRepeatMarkWriteList(index, writeIndex);
  },
  write2Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let writeIndex = 'write2';
    this.setRepeatMarkWriteList(index, writeIndex);

  },
  write3Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let writeIndex = 'write3';
    this.setRepeatMarkWriteList(index, writeIndex);
  },
  write4Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let writeIndex = 'write4';
    this.setRepeatMarkWriteList(index, writeIndex);
  },
  write5Method: function (e) {
    let index = e.currentTarget.dataset.index;
    let writeIndex = 'write5';
    this.setRepeatMarkWriteList(index, writeIndex);
  },

  getNoRepeatWriteList: function (writeList) {
    let wordList = this.getWordList(this.getResultArray()[0]);
    let wordString = '';
    for (let x in wordList) {
      if (typeof (wordList[x].word1) != "undefined") {
        wordString = wordString + wordList[x].word1 + ',';
      }
      if (typeof (wordList[x].word2) != "undefined") {
        wordString = wordString + wordList[x].word2 + ',';
      }
      if (typeof (wordList[x].word3) != "undefined") {
        wordString = wordString + wordList[x].word3 + ',';
      }
      if (typeof (wordList[x].word4) != "undefined") {
        wordString = wordString + wordList[x].word4 + ',';
      }
    }

    var writeString = '';

    for (let x in writeList) {
      if (wordString.indexOf(writeList[x].write1) == -1) {
        if (typeof (writeList[x].write1) != "undefined") {
          writeString = writeString + writeList[x].write1;
        }
      }
      if (wordString.indexOf(writeList[x].write2) == -1) {
        if (typeof (writeList[x].write2) != "undefined") {
          writeString = writeString + writeList[x].write2;
        }
      }
      if (wordString.indexOf(writeList[x].write3) == -1) {
        if (typeof (writeList[x].write3) != "undefined") {
          writeString = writeString + writeList[x].write3;
        }
      }
      if (wordString.indexOf(writeList[x].write4) == -1) {
        if (typeof (writeList[x].write4) != "undefined") {
          writeString = writeString + writeList[x].write4;
        }
      }
      if (wordString.indexOf(writeList[x].write5) == -1) {
        if (typeof (writeList[x].write5) != "undefined") {
          writeString = writeString + writeList[x].write5;
        }
      }
    }
    var writeArray = writeString.replace(/(.)(?=[^$])/g, "$1,").split(",");
    writeList = this.getWriteList(writeArray);
    return writeList;
  },

  repeat: function () {
    let writeList = this.getWriteList(this.getResultArray()[1]);
    if (this.data.isrepeat) {
      writeList = this.getNoRepeatWriteList(writeList);
    }

    this.setData({
      isrepeat: !this.data.isrepeat,
      writeList: this.getMarkWriteList(writeList)
    })
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
      } else if (m == 3) {
        markMap['mark3'] = markSourceArray[x];
      } else if (m == 4) {
        markMap['mark4'] = markSourceArray[x];
        markList.push(markMap);
        m = 0;
        markMap = {};
      }
    }

    if (markList.length * 4 < markSourceArray.length) {
      if (typeof (markSourceArray[markList.length * 4]) != "undefined") {
        markMap["mark1"] = markSourceArray[markList.length * 4];
      }

      if (typeof (markSourceArray[markList.length * 4 + 1]) != "undefined") {
        markMap["mark2"] = markSourceArray[markList.length * 4 + 1];
      }

      if (typeof (markSourceArray[markList.length * 4 + 2]) != "undefined") {
        markMap["mark3"] = markSourceArray[markList.length * 4 + 2];
      }

      if (typeof (markSourceArray[markList.length * 4 + 3]) != "undefined") {
        markMap["mark4"] = markSourceArray[markList.length * 4 + 3];
      }

      markList.push(markMap);
    }

    return markList;
  },

  mark: function () {
    let markString = wx.getStorageSync('markList');
    if (markString == "") {
      wx.showToast({
        title: '点击词语，进行标记',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      this.setData({
        markShow: true,
        wordShow: false,
        writeShow: false,
        classShow: false,
        markList: this.getMarkList('markList')
      })
    }
  },

  getDeleteHistoryList: function (key) {
    if (this.data.historySelectArray.length == 0) {
      return;
    }
    let markList = this.getMarkList(key);
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
      if (this.data.historySelectArray[x]['select3'] == 1) {
        if (typeof (markList[x].mark3) != "undefined") {
          deleteMarkList.push(markList[x].mark3);
        }
      }
      if (this.data.historySelectArray[x]['select4'] == 1) {
        if (typeof (markList[x].mark4) != "undefined") {
          deleteMarkList.push(markList[x].mark4);
        }
      }
    }

    return deleteMarkList;
  },

  getDeleteMarkList: function (key) {
    if (this.data.markSelectArray.length == 0) {
      return;
    }
    let markList = this.getMarkList(key);
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
      if (this.data.markSelectArray[x]['select3'] == 1) {
        if (typeof (markList[x].mark3) != "undefined") {
          deleteMarkList.push(markList[x].mark3);
        }
      }
      if (this.data.markSelectArray[x]['select4'] == 1) {
        if (typeof (markList[x].mark4) != "undefined") {
          deleteMarkList.push(markList[x].mark4);
        }
      }
    }

    return deleteMarkList;
  },

  markCancel: function (e) {
    this.data.markSelectArray = [];
    this.setData({
      markShow: false,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      classShow: true,
      wordList: this.getMarkWordList('markList')
    })
  },


  removeMark: function () {
    if (this.data.markSelectArray.length == 0) {
      wx.showToast({
        title: '点击词语，进行删除',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      let key = 'markList';
      this.removeSub(key);
      //清空标记选择数组
      this.data.markSelectArray = [];
      let writeList = this.getWriteList(this.getResultArray()[1]);
      writeList = this.getNoRepeatWriteList(writeList);

      this.setData({
        markShow: false,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        classShow: true,
        wordList: this.getMarkWordList(key),
        writeList: this.getMarkWriteList(writeList)
      })
    }
  },

  removeSub: function (key) {
    let deleteMarkList;
    if (key == 'markList') {
      deleteMarkList = this.getDeleteMarkList(key);
    } else {
      deleteMarkList = this.getDeleteHistoryList(key);
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
      writeShow: false,
      classShow: false,
      termList: termList,
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  termCancel: function (e) {
    let lesson = wx.getStorageSync('lesson');
    if (lesson == '') {
      this.setData({
        termShow: false,
        wordShow: false,
        writeShow: false,
        classShow: false
      })
    } else {
      this.setData({
        termShow: false,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        classShow: true
      })
    }
  },

  //数组去重
  unique: function (array) {
    var temp = [];
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  },

  previous: function (e) {
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
        //初始化词语播放列表
        this.initWordMusicList();

        //初始化写字播放列表
        this.initWriteMusicList();

        let writeList = this.getWriteList(this.getResultArray()[1]);
        writeList = this.getNoRepeatWriteList(writeList);

        this.setData({
          isrepeat: false,
          term: term,
          lesson: lesson,
          name: name,
          wordShow: this.getWordShow(),
          writeShow: this.getWriteShow(),
          wordList: this.getMarkWordList('markList'),
          writeList: this.getMarkWriteList(writeList),
          isWordDictation: true,
          wordPlayStatus: false,
          isWriteDictation: true,
          writePlayStatus: false,
          wordMusicIndex: -1,
          writeMusicIndex: -1,
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
      //初始化词语播放列表
      this.initWordMusicList();

      //初始化写字播放列表
      this.initWriteMusicList();

      let writeList = this.getWriteList(this.getResultArray()[1]);
      writeList = this.getNoRepeatWriteList(writeList);

      this.setData({
        isrepeat: false,
        term: term,
        lesson: lesson,
        name: name,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        wordList: this.getMarkWordList('markList'),
        writeList: this.getMarkWriteList(writeList),
        isWordDictation: true,
        wordPlayStatus: false,
        isWriteDictation: true,
        writePlayStatus: false,
        wordMusicIndex: -1,
        writeMusicIndex: -1,
      })
    }
  },

  next: function (e) {
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
            break;
          }
        }

        //初始化词语播放列表
        this.initWordMusicList();

        //初始化写字播放列表
        this.initWriteMusicList();

        let writeList = this.getWriteList(this.getResultArray()[1]);
        writeList = this.getNoRepeatWriteList(writeList);

        this.setData({
          isrepeat: false,
          term: term,
          lesson: lesson,
          name: name,
          wordShow: this.getWordShow(),
          writeShow: this.getWriteShow(),
          wordList: this.getMarkWordList('markList'),
          writeList: this.getMarkWriteList(writeList),
          isWordDictation: true,
          wordPlayStatus: false,
          isWriteDictation: true,
          writePlayStatus: false,
          wordMusicIndex: -1,
          writeMusicIndex: -1,
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

      //初始化词语播放列表
      this.initWordMusicList();

      //初始化写字播放列表
      this.initWriteMusicList();

      let writeList = this.getWriteList(this.getResultArray()[1]);
      writeList = this.getNoRepeatWriteList(writeList);

      this.setData({
        isrepeat: false,
        term: term,
        lesson: lesson,
        name: name,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        wordList: this.getMarkWordList('markList'),
        writeList: this.getMarkWriteList(writeList),
        isWordDictation: true,
        wordPlayStatus: false,
        isWriteDictation: true,
        writePlayStatus: false,
        wordMusicIndex: -1,
        writeMusicIndex: -1,
      })
    }

  },

  getWordShow: function () {
    let wordShow = false;
    if (this.getResultArray()[0] != '') {
      wordShow = true;
    }
    return wordShow;
  },

  getWriteShow: function () {
    let writeList = this.getWriteList(this.getResultArray()[1]);
    let writeShow = false;
    if (writeList.length > 0) {
      writeShow = true;
    }
    return writeShow;
  },

  term1Method: function (e) {
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
      lessonList: lessonList,
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  term2Method: function (e) {
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
      lessonList: lessonList,
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  getName: function () {

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

  lesson1Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson1']) == "undefined") {
      return;
    }

    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson1']);
    wx.setStorageSync('term', this.data.term);

    //初始化词语播放列表
    this.initWordMusicList();

    //初始化写字播放列表
    this.initWriteMusicList();

    let writeList = this.getWriteList(this.getResultArray()[1]);
    writeList = this.getNoRepeatWriteList(writeList);

    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson1'],
      wordList: this.getMarkWordList('markList'),
      writeList: this.getMarkWriteList(writeList),
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  lesson2Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson2']) == "undefined") {
      return;
    }

    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson2']);
    wx.setStorageSync('term', this.data.term);

    //初始化词语播放列表
    this.initWordMusicList();

    //初始化写字播放列表
    this.initWriteMusicList();

    let writeList = this.getWriteList(this.getResultArray()[1]);
    writeList = this.getNoRepeatWriteList(writeList);
    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson2'],
      wordList: this.getMarkWordList('markList'),
      writeList: this.getMarkWriteList(writeList),
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  lesson3Method: function (e) {
    if (typeof (this.data.lessonList[e.currentTarget.dataset.index]['lesson3']) == "undefined") {
      return;
    }

    wx.setStorageSync('lesson', this.data.lessonList[e.currentTarget.dataset.index]['lesson3']);
    wx.setStorageSync('term', this.data.term);

    //初始化词语播放列表
    this.initWordMusicList();

    //初始化写字播放列表
    this.initWriteMusicList();

    let writeList = this.getWriteList(this.getResultArray()[1]);
    writeList = this.getNoRepeatWriteList(writeList);
    this.setData({
      previousShow: true,
      nextShow: true,
      lessonShow: false,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      term: this.data.term,
      name: this.getName(),
      lesson: this.data.lessonList[e.currentTarget.dataset.index]['lesson3'],
      wordList: this.getMarkWordList('markList'),
      writeList: this.getMarkWriteList(writeList),
      isWordDictation: true,
      wordPlayStatus: false,
      isWriteDictation: true,
      writePlayStatus: false,
      wordMusicIndex: -1,
      writeMusicIndex: -1,
    })
  },

  lessonCancel: function (e) {
    let lesson = wx.getStorageSync('lesson');
    if (lesson == '') {
      this.setData({
        lessonShow: false,
        wordShow: false,
        writeShow: false,
        classShow: false
      })
    } else {
      this.setData({
        lessonShow: false,
        wordShow: this.getWordShow(),
        writeShow: this.getWriteShow(),
        classShow: true
      })
    }
  },

  getResultArray: function () {
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');

    if (term != "" && lesson != "") {
      let json = oneWordJson.oneWordJson;
      let wordString = '';
      let writeString = '';
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
                writeString = wordList[x].word;
              } else if (m == 1) {
                wordString = wordList[x].word;
              }
            }
          }
        }
      }

      var writeArray = writeString.replace(/(.)(?=[^$])/g, "$1,").split(",");
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
  onLoad: function (options) {
    let term = wx.getStorageSync('term');
    let lesson = wx.getStorageSync('lesson');
    if (term == '' || lesson == '') {
      return;
    }

    //初始化token
    this.initToken();

    //初始化标记历史
    this.initHistory();

    //初始化词语播放列表
    this.initWordMusicList();

    //初始化写字播放列表
    this.initWriteMusicList();

    let writeList = this.getWriteList(this.getResultArray()[1]);
    writeList = this.getNoRepeatWriteList(writeList);

    this.setData({
      previousShow: true,
      nextShow: true,
      classShow: true,
      wordShow: this.getWordShow(),
      writeShow: this.getWriteShow(),
      wordList: this.getMarkWordList('markList'),
      writeList: this.getMarkWriteList(writeList),
      term: this.getResultArray()[2],
      name: this.getResultArray()[3],
      lesson: this.getResultArray()[4],
      historyButtonShow: this.getHistoryButtonShow()
    })
  },

  initHistory: function () {

    let historyFlag = wx.getStorageSync('historyFlag');
    if (historyFlag == '1') {
      return;
    }

    let markString = wx.getStorageSync('markList');
    if (markString != "") {
      wx.setStorageSync('historyList', markString);
    }

    wx.setStorageSync('historyFlag', '1');
  },

  getHistoryButtonShow: function () {
    let markString = wx.getStorageSync('historyList');
    if (markString == "") {
      return false;
    } else {
      return true;
    }
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

    if (wordList.length * 4 < wordArray.length) {
      if (typeof (wordArray[wordList.length * 4]) != "undefined") {
        wordItem["word1"] = wordArray[wordList.length * 4];
      }

      if (typeof (wordArray[wordList.length * 4 + 1]) != "undefined") {
        wordItem["word2"] = wordArray[wordList.length * 4 + 1];
      }

      if (typeof (wordArray[wordList.length * 4 + 2]) != "undefined") {
        wordItem["word3"] = wordArray[wordList.length * 4 + 2];
      }

      if (typeof (wordArray[wordList.length * 4 + 3]) != "undefined") {
        wordItem["word4"] = wordArray[wordList.length * 4 + 3];
      }

      wordList.push(wordItem);
    }

    return wordList;
  },

  getWriteList: function (writeArray) {

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


    if (writeList.length * 5 < writeArray.length) {
      if (typeof (writeArray[writeList.length * 5]) != "undefined") {
        writeItem["write1"] = writeArray[writeList.length * 5];
      }

      if (typeof (writeArray[writeList.length * 5 + 1]) != "undefined") {
        writeItem["write2"] = writeArray[writeList.length * 5 + 1];
      }

      if (typeof (writeArray[writeList.length * 5 + 2]) != "undefined") {
        writeItem["write3"] = writeArray[writeList.length * 5 + 2];
      }

      if (typeof (writeArray[writeList.length * 5 + 3]) != "undefined") {
        writeItem["write4"] = writeArray[writeList.length * 5 + 3];
      }

      writeList.push(writeItem);
    }

    return writeList;
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