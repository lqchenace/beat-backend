// pages/forum/post/post.js
const sort = ["技术", "生活"];
const util = require("../../../utils/util.js");
const api = require("../../../utils/api.js");
let i = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionsort: false,
    val: [0],
    sort: sort,
    style:sort[0],
    upimgarr: [],
    commentInput:'',
    pname:'',
    foid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ foid: "fode34j" + Math.random().toString(36).substr(2) });
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
  // 监听作品标题的输入
  listenername: function (e) {
    this.setData({
      pname: e.detail.value
    })
  },
  listenerSearchInput:function(e){
    this.setData({
      commentInput: e.detail.value
    })
  },
  announcebeat:function(e){
    this.upforum();
  },
  upforum: function () {
    // 获取约拍表单数据
    let data = {};
    let that = this;

    let uid = wx.getStorageSync('openid');
    data.uid = uid;
    data.title = this.data.pname;
    data.command = this.data.commentInput;
    data.style =this.data.style;
    data.foid = this.data.foid;
    data.comtime =util.formatTime(new Date());
    data.reploynum=0;
    data.clicknum=0;
    console.log(data);
    if (this.data.pname == '' || this.data.command == '' || this.data.style == '') {
      this.setData({ code: true, rewalk: '标题和内容、分类不能为空' });
    } else if (this.data.upimgarr.length==0){
      api.addSave('http://127.0.0.1:7001/addForum', data).then(res => {
        if (res == 1)
          wx.navigateTo({
            url: '../../wantBeathim/addSuccess/addSuccess',
          })
      })
    }
     else {
      // 上传图片
      wx.uploadFile({
        url: 'http://127.0.0.1:7001/api/uploads',                  //服务器接口地址
        filePath: that.data.upimgarr[i],
        name: uid + "#" + that.data.foid + "#" + i,
        success: function (res) {
          // util.showSuccess('上传图片成功')
        }, complete: function (complete) {
          // console.log("com", complete)
          i++;
          // 当图片都上传成功的时候就可以提交表单
          if (i == that.data.upimgarr.length) {
            let dd = JSON.parse(complete.data);
            data.imgurl = dd.data.imgurl;
            util.showSuccess('上传图片成功')
            api.addSave('http://127.0.0.1:7001/addForum', data).then(res => {
              if (res == 1)
                wx.navigateTo({
                  url: '../../wantBeathim/addSuccess/addSuccess',
                })
            })
          } else if (i < that.data.upimgarr.length) {      //若图片还没有传完，则继续调用函数
            that.upforum()
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