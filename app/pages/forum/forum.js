// pages/forum/forum.js
const sort=["全部","技术","生活"];
const util = require("../../utils/util.js");
const api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    sort:sort[0],
    forumlist:[],
    forumlist1: [],
    publicurl: util.pictureurl,
    label:sort,
    showsort:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getforumlist({data:{},sort:'comtime'});
    this.getforumlist({ data: {}, sort: 'reploynum' });
  },
  getforumlist: function (data) {
    let that=this;
    console.log("sdfsfsfsdfsdfsdfsdf");
    api.addSave('http://127.0.0.1:7001/getforumlist', data).then(res => {
      console.log("sfsfsfsfsfsd", res);
      let resArr = []
      res.res.map((item, index) => {
        let itembeat = {};
        itembeat.bid = item.foid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.name = item.User.nickname;
        itembeat.command = item.command;
        itembeat.style = item.style;
        itembeat.title = item.title;
        itembeat.comtime=item.comtime;
        itembeat.clicknum = item.clicknum;
        itembeat.reploynum = item.reploynum;
        resArr.push(itembeat);
      });
      if(res.logo=='comtime')
      that.setData({
        forumlist: resArr
      });
      else
        that.setData({
          forumlist1: resArr
        });
    });
  },
  opensort:function(){
   this.setData({showsort:true});
  },
  seclectsort:function(e){
    let s=e.target.dataset.style;
    this.setData({ showsort: false,sort:s});
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
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  // 发帖
  postessay:function(){
  wx.navigateTo({
    url: './post/post',
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