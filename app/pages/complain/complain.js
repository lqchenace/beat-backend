// pages/forum/post/post.js
const sort = ["盗图", "欺诈","色情","不实信息","骚扰","其他"];
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
let i = 0;
let cerarr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionsort: false,
    val: [0],
    sort: sort,
    style: '请选择投诉的原因',
    upimgarr: [],
    commentInput: '',
    bid:'',
    uid2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uid2);
    this.setData({bid:options.bid,uid2:options.uid2});
  },
  closesort: function () {
    this.setData({
      conditionsort: false
    })
  },
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
  },
  // 选择分类
  getconfirmval: function () {
    this.setData({ style: sort[this.data.val], conditionsort: false });
  },
  opensort: function (e) {
    this.setData({
      conditionsort: true
    })
  },
  //上传图片
  upImgClick: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        // util.showBusy('正在上传')
        var filePath = res.tempFilePaths;
        that.setData({ upimgarr: filePath });
        console.log(res);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  listenerSearchInput: function (e) {
    this.setData({
      commentInput: e.detail.value
    })
  },
  addcomplain: function (e) {
    this.upcomplain();
  },
  upcomplain: function () {
    // 获取约拍表单数据
    let data = {};
    let that = this;

    let uid = wx.getStorageSync('openid');
    data.uid = uid;
    data.cocommand = this.data.commentInput;
    data.cotype = this.data.style;
    data.bid = this.data.bid;
    data.uid2 = this.data.uid2;
    data.complaintime = util.formatTime(new Date());
    console.log(data);
    if (this.data.upimgarr.length == 0) {
      api.addSave(util.pictureurl +'addCertification', data).then(res => {
        if (res == 1)
          wx.navigateTo({
            url: '../wantBeathim/addSuccess/addSuccess?con=您的投诉已经发送成功，本平台会对该用户进行跟踪调查',
          })
          console.log("投诉成功");
      })
    }
    else {
      // 上传图片
      wx.uploadFile({
        url: util.pictureurl +'api/uploadidImg',                  //服务器接口地址
        filePath: that.data.upimgarr[i],
        name: 'complain',
        success: function (res) {
        }, complete: function (complete) {
          console.log("com", complete)
          let dd = JSON.parse(complete.data);
          cerarr.push(dd.data.imgurl);
          i++;
          // 当图片都上传成功的时候就可以提交表单
          if (i == that.data.upimgarr.length) {
            data.coimg = cerarr.join("#");
            api.addSave(util.pictureurl +'addCertification', data).then(res => {
              if (res == 1)
                util.showSuccess('投诉成功')
              wx.navigateTo({
                url: '../wantBeathim/addSuccess/addSuccess?con=感谢您的反馈，您的投诉已经发送成功，本平台会对该用户进行跟踪调查',
              })
            })
          } else if (i < that.data.upimgarr.length) {      //若图片还没有传完，则继续调用函数
            that.upcomplain()
          }
        },
        fail: function (e) {
          util.showModel('上传图片失败')
          console.error(e);
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