// pages/my/beatAndSave/beatAndSave.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  beatList:[],
  showSetting:true,
  showDeletebeat:false,
  operate:null,
  hide_firstline:true,
  publicurl: util.pictureurl,
  logo:'约拍'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let uid = wx.getStorageSync('openid');
  let data = { uid: uid };
  if(options.type) {
    if(options.type=="save"){
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.setData({ showSetting: false })
      this.getTheSave(data);

    } else if (options.type == "photo"){
      wx.setNavigationBarTitle({
        title: '我的作品相册'
      })
      this.setData({ operate: '删除该作品相册', hide_firstline: false ,logo:'作品相册'})
      let pro = {};
      pro.sort = 'product';
      pro.uid = data;
      this.getMyBeat(pro);
    }
    else{
      wx.setNavigationBarTitle({
        title: '我的约拍'
      })
      this.setData({ operate: '删除该约拍' })
      let beat={};
      beat.sort='beat';
      beat.uid=data;
      this.getMyBeat(beat);
    }
  }

  },
//显示收藏信息
getTheSave:function(data){
  let that = this;
  api.addSave(util.pictureurl +'TheSaveShow', data).then(res => {
    let resArr = []
    res.map((item, index) => {
      let itembeat = {};
      itembeat.bid=item.bid;
      itembeat.behavior = item.Beat.beatrole;
      itembeat.cost = item.Beat.costtype;
      itembeat.command = item.Beat.command;
      itembeat.tookimg = item.imgurl;
      itembeat.beatUrl = item.beatUrl;
      resArr.push(itembeat);
    })
    that.setData({
      beatList: resArr
    });
  })
},
// 显示我的约拍
getMyBeat:function(data){
  let that = this;
  api.addSave(util.pictureurl +'MyBeatList', data).then(res => {
    console.log("0000", res);
    let resArr = []
    if(data.sort=='beat'){
        res.map((item, index) => {
          let itembeat = {};
          itembeat.bid = item.bid;
          itembeat.behavior = item.beatrole;
          itembeat.cost = item.costtype;
          itembeat.command = item.command;
          itembeat.tookimg = item.imgurl;
          itembeat.beatUrl = item.beatUrl;
          resArr.push(itembeat);
        })
    } else if (data.sort == 'product'){
      res.map((item, index) => {
        let itembeat = {};
        itembeat.pid = item.pid;
        itembeat.title = item.pname;
        itembeat.command = item.command;
        itembeat.tookimg = item.imgurl;
        itembeat.beatUrl = item.beatUrl;
        resArr.push(itembeat);
      })
    }
    that.setData({
      beatList: resArr
    });
  })
},
//点击跳转约拍详情页
  savedetail:function (e) {
    let b = e.currentTarget.dataset.id;
    let logo = this.data.logo;
    let u = wx.getStorageSync('openid');
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails?id=' + b + '&uid=' + u + '&logo=' + logo,
    })
  },
//  弹出删除约拍信息的弹窗
  showhide:function(){
    this.setData({ showDeletebeat: true })
  },
  // 隐藏 弹出删除约拍信息的弹窗
  returndelete:function(){
    this.setData({ showDeletebeat: false })
  },
  //点击某条约拍信息，跳转到详情页
  beatdetail: function () {
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails',
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