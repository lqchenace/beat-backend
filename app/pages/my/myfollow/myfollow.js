// pages/my/myfollow/myfollow.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  followlist:[],
  confollow:true,
  publicurl: util.pictureurl,
  uid:'',
  title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync('openid');
    let data = {};
    data.uid = {uid:uid};
   if(options.sort){
     if(options.sort=="follow"){
       wx.setNavigationBarTitle({
         title: '我的关注'
       })
       data.type='follow';
       this.setData({confollow:true,uid:uid,title:'follow'})

     }
       else{
       wx.setNavigationBarTitle({
         title: '我的粉丝'
       })
       data.type = 'fans';
       this.setData({ confollow: false, uid: uid, title: 'fans'})
       }
     this.getFollowList(data);
   }
  },
   getFollowList:function(data){
     let that = this
     api.addSave(util.pictureurl +'getFollowList',data).then(res => {
      //  console.log(res);
       let resArr = [];
       res.list.map((item, index) => {
         let itembeat = {};
         itembeat.id=item.followid;
         itembeat.uid = item.uid;
         itembeat.city = item.User.address.split("#")[1];
         itembeat.name = item.User.nickname;
         itembeat.role = item.User.role;
         itembeat.avatarUrl = item.User.imgurl;
         itembeat.imgurl = item.User.headimg;
         resArr.push(itembeat);
       })
       that.setData({
         followlist: resArr
       });
     })
  },
  deleteandfollow:function(e){
    let id = e.currentTarget.dataset.id;
    let data={followid:id}
    let that=this;
    api.addSave(util.pictureurl + 'deleteFollow', data).then(res => {
       console.log("sfsfs",res);
      let param = { uid:{uid: that.data.uid}, type: that.data.title};
      console.log("param",param);
      that.getFollowList(param);
    })
  },
  addfollow: function (e) {
    let id = e.currentTarget.dataset.id;
    let data = { uid: this.data.uid, personid: id }
    console.log("11111111", data);
    let that = this;
    api.addSave(util.pictureurl + 'addFollow', data).then(res => {
      console.log("sfsfs", res);
      that.setData({ confollow: true})
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