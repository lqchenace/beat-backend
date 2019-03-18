// pages/authorize/authorize.js
var app = getApp();
var secret ='8ae4e3c23025029539b97b2cbc92b0f4';
var appid ='wx0ad0a0b467d8046c';
var dataform={};
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
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo);
    dataform = e.detail.userInfo;
    this.login();
  },
  login:function(){
    wx.login({
      success: function (res) {
        wx.request({
          //后台接口地址
          url: "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+res.code+"&grant_type=authorization_code",
          data: {},
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            dataform.openid=res.data.openid;
                wx.request({
                    url: 'http://127.0.0.1:7001/user',
                    method: 'POST',
                    header: {
                      'content-type': 'application/json'
                    },
                    data:dataform,
                    dataType: 'json',
                    success: res => {
                      wx.setStorageSync('openid', res.data.data.uid);
                      wx.navigateBack();
                    }
                  })
          }
        })
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