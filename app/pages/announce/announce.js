// pages/announce/announce.js
const api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  containertap:function(e){
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    } else {
    api.getBlack().then(res => {
     console.log(res);
      if (res[0].black == 1){
       wx.showToast({
         title: '您好，您目前没有权限执行此操作',
         icon: 'none',
         duration: 2000
       })
     }else{
       var sort, sort1, sort2;
       if (e.currentTarget.dataset.sort == '约拍') {
         sort = '你想约拍模特还是摄影师？';
         sort1 = '约摄影师';
         sort2 = '约模特';
       } else {
         sort = '选择你在作品中的身份';
         sort1 = '我是摄影师';
         sort2 = '我是模特';
       }
       wx.navigateTo({
         url: '../announce/Releasearound/ReleaseAround?sort=' + sort + '&sort1=' + sort1 + '&sort2=' + sort2
       })
     }
    })
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