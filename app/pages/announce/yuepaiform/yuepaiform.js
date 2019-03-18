// pages/announce/yuepaiform/yuepaiform.js
const app = getApp();
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgshow:"",
    showmore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 显示更多选项
  showmore:function(){
    this.setData({showmore:!this.data.showmore});
  },
  //上传图片
  upImgClick: function (e) {
   var that=this;
    wx.chooseImage({
      count: 9,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]               //获取图片路径
        // 上传图片
        wx.uploadFile({
          url: 'http://127.0.0.1:7001/api/uploads',                  //服务器接口地址
          filePath: filePath,
          name: 'file',
          success: function (res) {
            util.showSuccess('上传图片成功')
            var url=JSON.parse(res.data);
            that.setData({ imgshow: url.data})
          },

          fail: function (e) {
            // util.showModel('上传图片失败')
            console.error(e);
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
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