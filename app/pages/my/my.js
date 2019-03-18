//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
Page({
  data: {
    userInfo: {},
    follow:'',
    fans:'',
    money:0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  onLoad: function () {
    let uid = wx.getStorageSync('openid');
    let that=this
    api.addSave('http://127.0.0.1:7001/showFansandFollownum', { uid:uid }).then(res => {
      console.log(res);
      that.setData({ follow: res.fnum[0].num, fans: res.fans[0].fans, money: res.money});
    })
 

  },
/**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }else{
         this.setData({
            userInfo: userInfo,
          })
    } 
  },
  // 编辑资料
  bindmyeditor:function(){
    wx.navigateTo({
      url: 'myEditor/myEditor',
    })
  },
  bindfollow:function(e){
   let val=e.currentTarget.dataset.sort;
   wx.navigateTo({
     url: 'myfollow/myfollow?sort='+val,
   })
  },
  // 点击我的收藏和我的约拍
  bindmybeat: function (e){
    let val = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: 'beatAndSave/beatAndSave?type=' + val,
    })
  },
  bindmyhome:function(){
    let uid = wx.getStorageSync('openid');
    wx.navigateTo({
      url: 'myHome/myHome?uid='+uid+'&fans='+this.data.fans+'&follow='+this.data.follow,
    })
  }
})