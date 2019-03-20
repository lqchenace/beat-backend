// pages/newsCenter/requiredetail/requiredetail.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
    publicurl: util.pictureurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data={};
    data.aid=options.aid;
    // data.uid=options.uid;
    this.getrequireDetailt(data);
  },
  getrequireDetailt: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/showrequiredetail', data).then(res => {
      console.log(res);
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        itembeat.bid = item.bid;
        itembeat.city = item.User.address.split("#")[1];
        itembeat.name = item.User.nickname;
        itembeat.role = item.User.role;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.headimg = item.User.headimg;
        itembeat.sex = item.User.sex;
        itembeat.phone = item.User.phone;
        itembeat.weixincode = item.User.weixincode;
        itembeat.bolgcode = item.User.bolgcode;
        itembeat.beacuse = item.require;
        itembeat.resource = item.Beat.command;
          resArr.push(itembeat);
      });
      that.setData({
        itemList: resArr
      });
    })
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