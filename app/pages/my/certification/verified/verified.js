// pages/my/certification/verified/verified.js
const api = require("../../../../utils/api.js");
const util = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publicurl: util.pictureurl,
    nickname: '',
    headimg: '',
    imgurl: '',
    sex:'',
    idcode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code=this.formatidcard(options.idcode);
    this.setData({idcode:code});
    let that = this;
    let uid = wx.getStorageSync('openid');
    // 获取个人信息
    api.addSave('http://127.0.0.1:7001/showMyInfo', { uid: uid }).then(res => {
      console.log("0000000", res);
      that.setData({
        nickname: res.info[0].nickname,
        headimg: res.info[0].headimg,
        imgurl: res.info[0].imgurl,
        sex: res.info[0].sex,
      });
    })
  },
  formatidcard:function(idcard) {
    // 15位身份证举例：130503 670401 001的含义; 13为河北，05为邢台，03为桥西区，出 生日期为1967年4月1日，顺序号为001。
    if(idcard.length == 15){
      return idcard.replace(/(\d{3})\d{9}(\d{3})/, "$1*********$2");
    } else {
      return idcard.replace(/(\d{3})\d{12}(\d{3})/, "$1************$2");
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})