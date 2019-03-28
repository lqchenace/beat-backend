// pages/my/certification/certification.js
const sort = ["模特", "摄影师"];
const api = require("../../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionsort: false,
    val: [0],
    sort: sort,
    role: '请选择认证身份',
    name:'请输入真实姓名',
    idcode:'请输入身份证号',
    pic1:'../../../images/icon/fan.png',
    pic2: '../../../images/icon/zheng.png',
    pic3: '../../../images/icon/ceryou.jpg',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  opensort: function (e) {
    this.setData({
      conditionsort: true
    })
  },
  closesort: function () {
    this.setData({
      conditionsort: false
    })
  },
  // 选择分类
  getconfirmval: function () {
    this.setData({ role: sort[this.data.val], conditionsort: false });
  },
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
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