// pages/newsCenter/requiredetail/requiredetail.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
    publicurl: util.pictureurl,
    looking:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data={};
    data.aid=options.aid;
    // data.uid=options.uid;
    this.getrequireDetailt(data);
  },
  getrequireDetailt: function (data) {
    let that = this;
    api.addSave(util.pictureurl +'showrequiredetail', data).then(res => {
      console.log(res); 
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        itembeat.aid = item.aid;
        itembeat.bid = item.bid;
        itembeat.city = item.User.address.split("#")[1];
        itembeat.name = item.User.nickname;
        itembeat.role = item.User.role;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.headimg = item.User.headimg;
        itembeat.sex = item.User.sex;
        itembeat.phone = item.User.phone;
        itembeat.weixincode = item.User.weixincode;
        itembeat.bolgcode = item.User.bolgcode;
        itembeat.beacuse = item.require;
        itembeat.resource = item.Beat.command;
        if(item.looked)
        that.setData({looking:true})
          resArr.push(itembeat);
      });
      that.setData({
        itemList: resArr
      });
    })
  },
  commitbeatinfo:function(e){
    let uid = wx.getStorageSync('openid');
    let aid = e.currentTarget.dataset.aid;
    let that = this;
    if(this.data.looking){
      wx.showToast({
        title: '已查看',
        icon: 'none',
        duration: 1000
      })
    }else{
    wx.showModal({
      title: '温馨提示',
      content: '发送约拍请求消耗1个约豆，确定发送吗？',
      success: function (res) {
        if (res.cancel) {
          wx.showToast({
            title: '您已经取消查看联系方式',
            icon: 'none',
            duration: 1000
          })
        } else if (res.confirm) {
          let data = {aid:aid,uid:uid};
          console.log(data);
          api.addSave(util.pictureurl + 'updatearrianbeat', data).then(res => {
            if (res == 1) {
              wx.showToast({
                title: '您已成功查看联系方式',
                icon: 'none',
                duration: 1000
              })
              that.setData({looking:true})
            }
          })
        }
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