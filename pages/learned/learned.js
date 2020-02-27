var oneWordJson = require('/../data/word.js');
// var multWordJson = require('/../data/words.js');
var englishJson = require('/../data/english.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制x图片是否显示
    condition: false,
    //英文多次出现
    flagEnglish: false,
    array: []
  },

  searchInput: function(e) {
    if (e.detail.value.length == 0){
      this.clean();
    }else{
      this.setData({
        condition: true,
        search: e.detail.value
      })
    }

  },

  clean: function() {
    this.data.search = '';
    this.setData({
      condition: false,
      flagEnglish: false,
      inputValue: '',
      array: []
    })
  },

  query: function(e) {
    var array = [];

    var search = this.data.search;
    if (search != null) {
      search = search.replace(/(^\s*)|(\s*$)/g, "");
    }
    if (search == null || search == "" || search == 'undefined') {
      this.setData({
        flagEnglish: false,
        array: []
      })
      return;
    }

    var json = '';
    var charCode = search.charCodeAt(0);
    var object1 = new Object();
    var tip = '：没有找到';
    object1.term = search + tip;
    array[0] = object1;
    var flag = '0';
    var flagEnglish = false;
    if (charCode <= 255) {
      //英文处理begin
      json = englishJson.englishJson;
      search = search.toLowerCase();
      let count = 0;
      for (var k in json) {
        //去掉引号
        var term = JSON.stringify(json[k].term).replace(/\"/g, '');
        var wordList = json[k].wordList;
        for (let x in wordList) {
          // console.log('x=' + wordList[x].type + ',' + wordList[x].word);
          var word = wordList[x].word;
          for (let y in word) {
            if (search == word[y]) {
              flag = '1';
              var object1 = new Object();
              object1.term = "在<<" + term + " , " + wordList[x].type + ">>学过";
              array[count++] = object1;
              break;
            }
          }
        }
      }
      if (array.length > 1) {
        flagEnglish = true;
      }
      this.setData({
        flagEnglish: flagEnglish,
        array: array
      });
      //英文处理end
    } else {
      //中文处理
      var wordLength = search.length;
      if (wordLength == 1) {
        //一个字的处理
        json = oneWordJson.oneWordJson;
        for (var k in json) {
          //去掉引号
          var term = JSON.stringify(json[k].term).replace(/\"/g, '');
          var wordList = json[k].wordList;
          for (let x in wordList) {
            // console.log('x=' + wordList[x].type + ',' + wordList[x].word);
            var name = wordList[x].name;
            var word = wordList[x].word;
            if (word.indexOf(search) != -1) {
              flag = '1';
              var object1 = new Object();
              object1.term = search + "：在<<" + term + " , " + wordList[x].type + ">>学过";
              object1.name = "课文：" + name;
              array[0] = object1;
              this.setData({
                array: array
              });
              return;
            }
          }
        }
      } else {
        //多字处理
        json = oneWordJson.oneWordJson;
        for (var k in json) {
          //去掉引号
          var term = JSON.stringify(json[k].term).replace(/\"/g, '');
          //console.log('term='+term);
          var wordList = json[k].wordList;
          flag = '0';
          for (let x in wordList) {
            var name = wordList[x].name;
            var word = wordList[x].word;
            if (word.indexOf(search) != -1) {
              var object1 = new Object();
              // console.log('x=' + x + ":" + wordList[x].type + ',' + wordList[x].word);
              flag = '1';
              object1.term = search + "：在<<" + term + " , " + wordList[x].type + ">>学过";
              object1.name = "课文：" + name;
              array[0] = object1;
              break;
            }
          }
          if (flag == '1') {
            break;
          }
        }
        search = search.replace(/\ +/g, "");
        let tempArray = search.split("");;
        let inputSet = new Set(tempArray);
        var inputArray = Array.from(inputSet);

        var length = 1;
        for (let m in inputArray) {
          flag = '0';
          var one = inputArray[m];
          //console.log("m=" + m + ":" + one);
          //处理多个字中的一个字
          json = oneWordJson.oneWordJson;
          for (var k in json) {
            //去掉引号
            var term = JSON.stringify(json[k].term).replace(/\"/g, '');
            var wordList = json[k].wordList;
            for (let x in wordList) {
              //console.log('x=' + wordList[x].type + ',' + wordList[x].word);
              var name = wordList[x].name;
              var word = wordList[x].word;
              if (word.indexOf(one) != -1) {
                flag = '1';

                var object1 = new Object();
                object1.term = one + "：在<<" + term + " , " + wordList[x].type + ">>学过";
                object1.name = "课文：" + name;
                length = length + ++m;
                array[length] = object1;
                break;
              }
            }

            if (flag == '1') {
              break;
            }
          }

          if (flag == '0') {
            var object1 = new Object();
            object1.term = one + tip;
            length = length + 1;
            array[length] = object1;
          }
        }

        this.setData({
          array: array
        });
      }


    }

    if (flag == '0') {
      //没有找到
      this.setData({
        array: array
      });
    }

  },


  mail: function() {
    wx.showModal({
      title: '联系',
      content: '邮箱：44526143@qq.com',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var array = this.iniData();
    // console.log("xyz array:" + array);
    // this.setData({
    //   array: array
    // });
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