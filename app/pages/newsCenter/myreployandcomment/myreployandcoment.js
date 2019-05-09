// pages/newsCenter/myreployandcomment/myreployandcoment.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
     publicurl: util.pictureurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync('openid');
    this.getreploylist({uid:uid});
  },
   getreploylist:function(data){
     let that = this;
     let arr = [];
     let i = 0;
     api.addSave(util.pictureurl +'showreployComment', data).then(res => {
      //  console.log("v",res);
       res.result.map(item=>{
         res.res.map(dev=>{
          //  筛选出评论我的人
           if (((item.parentid == dev.bcid) || (item.uid2 == dev.bcid))&&dev.uid==data.uid)
             arr.push({bcid:item.bcid,bid:item.bid});
         })
       })
     })
     setTimeout(function(){
       let resarr=[];
      //  console.log(arr);
       arr.map(item=>{
        //  取得评论我的人的详细信息系
         api.addSave(util.pictureurl +'showreploydetail',  item ).then(res => {
          //  console.log("d0",res);
           res.map((item, index) => {
             let itembeat = {};
             itembeat.bid = item.bid;
             itembeat.parentid = item.parentid;
             itembeat.bcid = item.bcid;
             itembeat.name = item.User.nickname;
             itembeat.headimgUrl = item.User.headimgUrl;
             itembeat.headimg = item.User.headimg;
             itembeat.resource = item.Beat?item.Beat.command : item.product.pdetail;
             itembeat.comment = item.comment;
             itembeat.comtime = item.comtime;
             resarr.push(itembeat);
           });
           i++;
         })
       })
       setTimeout(function () {
         if (i >= arr.length)
           that.setData({
             itemList: resarr
           });
       }, 500);
     },300)

  },
  gotobeatdetail:function(e){
    let id = e.currentTarget.dataset.id;
    let bcid = e.currentTarget.dataset.bcid;
    let name = e.currentTarget.dataset.name;
    let parentid = e.currentTarget.dataset.parentid;
    let uid = wx.getStorageSync('openid');
    let logo;
    if (id.indexOf("fdg")!=-1)
      logo ="作品相册";
    else
      logo = "约模特";
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails?id=' + id + '&uid=' + uid+'&parentid='+parentid+'&bcid='+bcid+'&logo='+logo+'&name='+name,
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