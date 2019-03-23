// pages/forum/fornumdetail/fornumdetail.js
const util = require("../../../utils/util.js");
const api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumlist:[],
    publicurl: util.pictureurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getforumlist({ data: { foid: options.foid }, sort: 'comtime' });
  },
  getforumlist: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/getforumlist', data).then(res => {
      console.log("sfsfsfsfsfsd", res);
      let resArr = []
      res.res.map((item, index) => {
        let itembeat = {};
        itembeat.foid = item.foid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.name = item.User.nickname;
        itembeat.command = item.command;
        itembeat.style = item.style;
        itembeat.title = item.title;
        itembeat.comtime = item.comtime;
        itembeat.clicknum = item.clicknum;
        itembeat.reploynum = item.reploynum;
        resArr.push(itembeat);
      });
        that.setData({
          forumlist: resArr
        });
    });
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