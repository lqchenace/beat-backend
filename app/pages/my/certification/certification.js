// pages/my/certification/certification.js
const sort = ["模特", "摄影师"];
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");
let uid = wx.getStorageSync('openid');
let i = 0;
let cerarr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conditionsort: false,
    val: [0],
    sort: sort,
    role: '请选择认证身份',
    name:'请输入真实姓名',
    idcode:'请输入身份证号',
    pic1:'../../../images/icon/fan.png',
    pic2: '../../../images/icon/zheng.png',
    pic3: '../../../images/icon/ceryou.jpg',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  opensort: function (e) {
    this.setData({
      conditionsort: true
    })
  },
  closesort: function () {
    this.setData({
      conditionsort: false
    })
  },
  // 选择分类
  getconfirmval: function () {
    this.setData({ role: sort[this.data.val], conditionsort: false });
  },
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
  },
  listenername: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  listeneridcode:function(e){
    this.setData({
      idcode: e.detail.value
    })
  },
  // 验证身份证格式是否正确
  vercification:function(){
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(this.data.idcode) === false) {
      wx.showToast({
        title: '身份证格式错误',
        icon: 'none',
        duration: 2000
      })
      return false;
    } 
  },
  // 上传身份证
  
  uploadpic1: function () {
    var that = this;
    wx.chooseImage({
      count: 1,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        that.setData({ pic1: filePath });
        console.log(filePath);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  uploadpic2: function () {
    var that = this;
    wx.chooseImage({
      count: 1,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        that.setData({ pic2: filePath });
        console.log(filePath);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  uploadpic3: function () {
    var that = this;
    wx.chooseImage({
      count: 1,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        that.setData({ pic3: filePath });
        console.log(filePath);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  // 点击提交实名认证
  gotocertification:function(){
    let upimgarr = [this.data.pic1, this.data.pic2, this.data.pic3];
    this.upcerfication(upimgarr);
  },
  upcerfication: function (upimgarr) {
    // 获取约拍表单数据
    let data = {};
    let that = this;
    data.uid = uid;
    data.uid = uid;
    data.name = this.data.name;
    data.idcode = this.data.idcode;
    data.role = this.data.role;
      // 上传图片
      wx.uploadFile({
        url: 'http://127.0.0.1:7001/api/uploadidImg',                  //服务器接口地址
        filePath: upimgarr[i],
        name: 'certification',
        success: function (res) {
        }, complete: function (complete) {
          console.log("com", complete)
          let dd = JSON.parse(complete.data);
          cerarr.push(dd.data.imgurl);
          i++;
          // 当图片都上传成功的时候就可以提交表单
          if (i == upimgarr.length) {
            data.imgurl=cerarr.join("#");
            api.addSave('http://127.0.0.1:7001/addCertification', data).then(res => {
              if (res == 1)
                util.showSuccess('认证申请成功')
                wx.navigateTo({
                  url: './verify/verify',
                })
            })
          } else if (i < upimgarr.length) {      //若图片还没有传完，则继续调用函数
            that.upcerfication(upimgarr)
          }
        },
        fail: function (e) {
          util.showModel('上传图片失败')
          console.error(e);
        }
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