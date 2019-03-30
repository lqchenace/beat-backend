// pages/my/myHome/myHome.js
const app = getApp();
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    currentData: 0,
    beatList:{},
    productList: {},
    publicurl: util.pictureurl,
    beatnum:'',
    theResult:true,
    theResult1: true,
    him:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.name){
      wx.setNavigationBarTitle({
        title: options.name+'的主页'
      })
      this.setData({him:false})
    }
      else{
      wx.setNavigationBarTitle({
        title: '我的主页'
      })
      }
    let data = { uid: options.uid };
    let that=this;
    if (options.follow && options.fans)
    this.setData({follow:options.follow,fans:options.fans})
    else{
      api.addSave('http://127.0.0.1:7001/showFansandFollownum', data).then(res => {
        that.setData({ follow: res.fnum[0].num, fans: res.fans[0].fans });
      })
    }
    this.getpersonInfo(data);
    let data1 = { sort: 'beat', uid: data};
    let data2 = { sort: 'product', uid: data };
    this.getMyBeat(data1);
    this.getMyBeat(data2);
  },
// 获取个人相关信息
  getpersonInfo:function(data){
    let that=this;
    api.addSave('http://127.0.0.1:7001/showMyInfo',data).then(res=>{
      let itembeat = {};
      res.info.map((item, index) => {
        itembeat.city = item.address.split("#")[1];
        itembeat.age = item.age;
        itembeat.nickName = item.nickname;
        itembeat.role = item.role;
        itembeat.avatarUrl = item.imgurl;
        itembeat.imgurl = item.headimg;
      })
      that.setData({
        userInfo: itembeat
      });
    })
  },
  // 显示我的约拍
  getMyBeat: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/MyBeatList', data).then(res => {
      let resArr = []
      if (data.sort == 'beat') {
        if(res.length!=0){
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
          let len = res.length;   
         that.setData({
          beatList: resArr,
          beatnum: len
        });
        }else{
          that.setData({
            theResult: false,
            beatnum: 0
          });
        }

      } else if (data.sort == 'product') {
        if(res.length!=0){
        res.map((item, index) => {
          let itembeat = {};
          itembeat.pid = item.pid;
          itembeat.title = item.pname;
          itembeat.command = item.command;
          itembeat.tookimg = item.imgurl;
          itembeat.beatUrl = item.beatUrl;
          resArr.push(itembeat);
        })
        that.setData({
          productList: resArr
        });
        }else{
          that.setData({
            theResult1:false
          });
        }
      }
    })

  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击某条约拍信息，跳转到详情页
  detail:function (e) {
    let b = e.currentTarget.dataset.bid;
    let u = wx.getStorageSync('openid');
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails?bid=' + b + '&uid=' + u,
    })
  },
  // 点击跳转作品相册详情
  productdetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails?id=' + id + '&logo=作品相册',
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //点击某条约拍信息，跳转到详情页
  beatdetail: function () {
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails',
    })
  },
  // 编辑资料
  bindmyeditor: function () {
    wx.navigateTo({
      url: '../myEditor/myEditor',
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