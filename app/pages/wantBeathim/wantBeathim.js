// pages/wantBeathim/wantBeathim.js
const util = require("../../utils/util.js");
const api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:{},
    commentInput: '',
    bid:'',
    uid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bid=options.bid;
    let uid = wx.getStorageSync('openid');
    this.setData({uid:uid,bid:bid});
    this.getOneperson({uid:uid});
  },
  getOneperson:function(data){
    let that = this;
    api.addSave(util.pictureurl+'getperson', data).then(res => {
      console.log(res);
      let list={};
      list.phone=res.phone;
      list.weixincode=res.weixincode;
      list.blogcode=res.bolgcode;
      that.setData({list:list});
    })
  },
  // 监听评论的输入
  listenerSearchInput: function (e) {
    this.setData({
      commentInput: e.detail.value
    })
  },
  // 提交约拍信息
  commitbeatinfo:function(){
    let list=this.data.list;
    let that = this;
    if (list.phone==null && list.weixincode==null && list.bolgcode==null) {
      wx.showModal({
        title: '温馨提示',
        content: '请完善您的个人信息',
        success: function (res) {
          if (res.cancel) {
            wx.showToast({
              title: '您已经取消约拍',
              icon: 'none',
              duration: 1000
            })
          } else if (res.confirm) {
            wx: wx.navigateTo({
              url: '../my/myEditor/myEditor',
            })
          }
        }
      })
     }else{
      wx.showModal({
        title: '温馨提示',
        content: '发送约拍请求消耗2个约豆，确定发送吗？',
        success: function (res) {
          if (res.cancel) {
            wx.showToast({
              title: '您已经取消约拍',
              icon: 'none',
              duration: 1000
            })
          } else if (res.confirm) {
            let data = { uid: that.data.uid, bid: that.data.bid, require: that.data.commentInput };
            console.log(data);
            api.addSave(util.pictureurl + 'addmyBeat', data).then(res => {
              if (res == 1) {
                wx: wx.navigateTo({
                  url: './addSuccess/addSuccess',
                })
              }
            })
          }
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