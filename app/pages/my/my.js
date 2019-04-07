//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
Page({
  data: {
    publicurl: util.pictureurl,
    nickname: '',
    headimg:'',
    imgurl:'',
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


  },
/**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    console.log("ddddddddddddd");
    let that=this;
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }else{
      let uid = wx.getStorageSync('openid');
      // 获取个人信息
      api.addSave(util.pictureurl+'showMyInfo', { uid: uid }).then(res => {
        // console.log("0000000", res);
        that.setData({
          nickname: res.info[0].nickname,
          headimg: res.info[0].headimg,
          imgurl: res.info[0].imgurl,
        });
      })
      let that = this
      api.addSave(util.pictureurl +'showFansandFollownum', { uid: uid }).then(res => {
        // console.log(res);
        that.setData({ follow: res.fnum[0].num, fans: res.fans[0].fans, money: res.money });
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
  },
  bindmycertification:function(){
    let uid = wx.getStorageSync('openid');
    api.addSave(util.pictureurl +'queryverify', { uid: uid }).then(res => {
      console.log("44",res)
      if(res==null)
        wx.navigateTo({
          url: 'certification/certification?uid=' + uid
        })
        else{
          if(res.status=='已审核')
            wx.navigateTo({
              url: 'certification/verified/verified?idcode='+res.idcode
            })
          else
            wx.navigateTo({
              url: 'certification/verify/verify'
            })
        }
    })
  }
})