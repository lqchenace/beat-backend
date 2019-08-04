// pages/my/myEditor/myEditor.js
const sort = ["模特", "摄影师"];
const api = require("../../../utils/api.js");
const bmap = require("../../../utils/bmap-wx.min.js");
const util = require("../../../utils/util.js");
var wxMarkerData = [];
var reg = /.+?(省|市|自治区|自治州|县|区)/g;
let uid;
Page({
  data: {
    publicurl: util.pictureurl,
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: '是否获取你的位置信息',
    showmap:false,
    nickname:'输入昵称',
    role:'请选择身份',
    phone:'输入手机号',
    weixincode:'输入微信号',
    blogcode:'输入微博号',
    headimg:'',
    imgurl:'',
    upimgarr:'',
    conditionsort: false,
    val: [0],
    sort:sort
  },
  onLoad: function () {
     uid = wx.getStorageSync('openid');
    var that = this;
    // 获取个人信息
    api.addSave(util.pictureurl +'showMyInfo',{uid:uid}).then(res => {
      let resArr = []
      console.log("0000000", res);
      that.setData({
        nickname: res.info[0].nickname,
        headimg: res.info[0].headimg,
        imgurl:res.info[0].imgurl,
        weixincode: res.info[0].weixincode != null && res.info[0].weixincode != '' ? res.info[0].weixincode : that.data.weixincode,
        phone: res.info[0].phone != null && res.info[0].phone != '' ? res.info[0].phone : that.data.phone,
        blogcode: res.info[0].bolgcode != null && res.info[0].bolgcode!=''? res.info[0].bolgcode : that.data.blogcode,
        role: res.info[0].role != null ? res.info[0].role :'请选择身份',
        rgcData: res.info[0].address != null ? res.info[0].address.split("#").join("") :'是否获取你的位置信息'
      });
    })
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '0oSInL129sGPHnAvGvylFTjmUoTcZw06'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    // 发起regeocoding检索请求 (地址逆解析)
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  // 点击显示地图
  getlocal: function () {
    this.setData({ showmap: true });
  },
  makertap: function (e) {
    var id = e.markerId;
    this.setData({
      rgcData: wxMarkerData[id].address,
      showmap: false
    });
  },
  // 保存修改
  gotosave:function(){
    let that=this;
   let data={};
   data.uid=uid;
   data.data={
     nickname:this.data.nickname,
     role:this.data.role,
     weixincode:this.data.weixincode,
     bolgcode:this.data.blogcode,
     phone:this.data.phone,
     address:this.data.rgcData.match(reg).join("#")
   }
   console.log("ll",data);

    if (this.data.upimgarr == '') {
      api.addSave(util.pictureurl +'updateuserinfo', data).then(res => {
        util.showSuccess('保存成功')
        if (res[0] == 1){
          wx.switchTab({
            url: '../my',
          })
        }
      })
    }
    else {
      // 上传图片
      wx.uploadFile({
        url: util.pictureurl +'api/uploadheadImg',                  //服务器接口地址
        filePath: that.data.upimgarr,
        name: uid,
        success: function (res) {
          // util.showSuccess('上传图片成功')
        }, complete: function (complete) {
          // console.log("com", complete)
          // 当图片都上传成功的时候就可以提交表单
          let dd = JSON.parse(complete.data);
          data.data.headimg = dd.data.imgurl;
          api.addSave(util.pictureurl +'updateuserinfo', data).then(res => {
            util.showSuccess('保存成功')
            console.log("88888",res);
            if (res[0] == 0)
              wx.switchTab({
                url: '../my',
              })
          })

        },
        fail: function (e) {
          util.showModel('修改信息失败')
          console.error(e);
        }
      })
    }
  },
  // 修改头像
  chooseimg:function(){
    var that = this;
    wx.chooseImage({
      count: 1,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        // util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0];
        that.setData({ upimgarr: filePath });
        console.log(filePath);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  // 监听昵称的输入
  listenername: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  // 监听手机号的输入
  listenerphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 监听微信号的输入
  listeneweixin: function (e) {
    this.setData({
      wexincode: e.detail.value
    })
  },
  // 监听微博号的输入
  listenerbolgname:function(e){
    this.setData({
      blogcode: e.detail.value
    })
  },
  closesort: function () {
    this.setData({
      conditionsort: false
    })
  },
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
  },
  // 选择分类
  getconfirmval: function () {
    this.setData({ role: sort[this.data.val], conditionsort: false });
  },
  opensort: function (e) {
    this.setData({
      conditionsort: true
    })
  },
})