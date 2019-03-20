// pages/newsCenter/myWantbeat/myWantbeat.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybeat:[],
    publicurl: util.pictureurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {};
    let uid = wx.getStorageSync('openid');
    data.uid = uid;
    data.sort = options.sort;
    if(options.sort=='mybeat'){
    wx.setNavigationBarTitle({
      title: '发起的约拍请求'
    })
    }
    else{
      wx.setNavigationBarTitle({
        title: '收到的约拍请求'
      })
    }
   this.getMywantbeat(data);
  },
  getMywantbeat:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/showrequirebeatList', data).then(res => {
      console.log(res);
      let resArr = [];
      res.map((item, index) => {
        let itembeat = {};
        if(item.aid){
        itembeat.bid = item.bid;
        itembeat.city = item.Beat.User.address.split("#")[1];
        itembeat.name = item.Beat.User.nickname;
        itembeat.role = item.Beat.User.role;
        itembeat.avatarUrl = item.Beat.User.headimgUrl;
        itembeat.imgurl = item.Beat.User.headimg;
        itembeat.sex = item.Beat.User.sex;
        itembeat.beacuse = item.require;
        itembeat.resource=item.Beat.command;
        }
        else{
          itembeat.aid= item.arrianbeat.aid;
          itembeat.city = item.arrianbeat.User.address.split("#")[1];
          itembeat.name = item.arrianbeat.User.nickname;
          itembeat.role = item.arrianbeat.User.role;
          itembeat.avatarUrl = item.arrianbeat.User.headimgUrl;
          itembeat.imgurl =item.arrianbeat.User.headimg;
          itembeat.sex = item.arrianbeat.User.sex;
          itembeat.beacuse = item.arrianbeat.require;
        }
        resArr.push(itembeat);
      })
      that.setData({
        mybeat: resArr
      });
    });
  },
  gotodetail:function(e){
    let bid = e.currentTarget.dataset.bid;
    let aid = e.currentTarget.dataset.aid;
    let uid = wx.getStorageSync('openid');
    // console.log(bid,u);
    if(aid==undefined){
        wx.navigateTo({
          url: '../../Beatdetails/Beatdetails?bid=' + bid + '&uid=' + uid,
        })
    }else{
      wx.navigateTo({
        url: '../requiredetail/requiredetail?aid=' + aid,
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