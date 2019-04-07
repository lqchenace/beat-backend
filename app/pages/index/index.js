//index.js
//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
const bmap = require("../../utils/bmap-wx.min.js");
var reg = /.+?(省|市|自治区|自治州|县|区)/g;
// 轮播图图片列表
const src = ['../../images/images2.jpg', '../../images/images.jpg','../../images/images5.jpg'];
// 地区列表引入
const tcity = require("../../utils/city.js");
const sort=['约摄影师','约模特'];
const sex=['男','女'];
var wxMarkerData = [];
Page({
  data: {
    imgUrls:src,
    condition:false,
    conditionsort: false,
    sort:[],
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    province: "",
    city: "",
    county: '',
    val:[0],
    filter:'',
    // 约拍信息列表-图片
    itemList:[],
    publicurl: util.pictureurl,
    local:'地区',
    beatrole:'类别',
    gender:'性别',
    showmap: false,
    markers: [],
    latitude: '',
    longitude: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 初始化
  onLoad: function () {
    // wx.clearStorageSync('userInfo');
  var that=this;
  tcity.init(that);
  var cityData = that.data.cityData;
  const provinces = [];
  const citys = [];
  const countys = [];
  this.showBeat({});
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys
    })
    // 请求获取当前位置
    wx.showModal({
      title: '约拍小程序请求授权当前位置',
      content: '获取当前位置可以查看离您最近的约拍信息哦',
      success: function (res) {
        if (res.cancel) {
          wx.showToast({
            title: '拒绝授权',
            icon: 'none',
            duration: 1000
          })
        } else if (res.confirm) {
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
          that.setData({ showmap: true });

        }
      }
    })

  },
  // 地图点击事件
  makertap: function (e) {
    var id = e.markerId;
    this.setData({
      local: wxMarkerData[id].address.match(reg)[1],
      showmap: false
    });

    let data = {
      area: this.data.local,
      beatrole: '类别',
      sex: '性别'}
    this.showBeat(data);
  },
  // 调用接口展示约拍信息
  showBeat:function(data){
    let that=this;
    api.getArranceBeatInfo(data).then(res=>{
      // console.log("rrr",res);
      let resArr=[]
      res.map((item,index)=>{
        let itembeat={};
        itembeat.bid = item.bid;
        item.uid=item.User.uid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.sex=item.User.sex;
        itembeat.name=item.User.nickname;
        itembeat.role=item.User.role;
        itembeat.city = item.area.split("#")[1];
        itembeat.behavior=item.beatrole;
        itembeat.cost=item.costtype;
        itembeat.command = item.command;
        itembeat.sortlabel = item.style.split("#");
        itembeat.tookimg = item.imgurl;
        itembeat.beatUrl = item.beatUrl;
        resArr.push(itembeat);
      })
      let i=0;
      resArr.map(item=>{
        api.addSave(util.pictureurl+'getsortnum', {bid:item.bid}).then(res => {
          item.full=res.full;
          item.comnum=res.comnum;
          item.arrian=res.arrian;
          i++;
        })
      })
      setTimeout(function(){
        if (i >= resArr.length)
          that.setData({
            itemList: resArr
          });
      },700)
    })   
    
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.showBeat({});
  },
  //点击某条约拍信息，跳转到详情页
  beatdetail:function(e){
    let bid = e.currentTarget.dataset.bid;
    let uid = wx.getStorageSync('openid');
    wx.navigateTo({
      url: '../Beatdetails/Beatdetails?bid='+bid+'&uid='+uid,
    })
  },
  // 点击"地区"时弹出地区选择框
  openarea:function(e){
    this.setData({
      condition: !this.data.condition
    })
  },
  //跳转筛选页面
  bindfilterInfo:function(e){
    var val = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../filterInfo/filterInfo?type='+val,
    })
  },
  bindfilterstyle:function(e){
    var val = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../filterInfo/StyleandWorks/StyleandWorks?type='+val,
    })
  },
  opensort:function(e){
    var val=e.currentTarget.dataset.sort;
    if(val=='sort'){
      this.setData({
        sort:sort
      })
    }else{
      this.setData({
        sort: sex
      })
    }
    this.setData({
      conditionsort:true,
      filter:val
    })
  },
  open: function () {
    this.setData({
      condition: false
    })
  },
 closesort:function(){
   this.setData({
     conditionsort:false
   })
 },
  bindChangesort:function(e){
    var v = e.detail.value;
      this.setData({ val:v});
  },
  // 类别和性别的过滤
  getconfirmval:function(){
    let data={};
    if(this.data.filter=='sort'){
      this.setData({ beatrole: sort[this.data.val]});
    }else{
      this.setData({gender: sex[this.data.val] });
    }
    this.setData({conditionsort: false });
    data.area = this.data.local;
    data.beatrole = this.data.beatrole;
    if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
    this.showBeat(data);
  },
// 地区过滤
  confirmplace:function(){
    let data = {};
    this.setData({ condition: false, local: this.data.cityData[this.data.values[0]].sub[this.data.values[1]].name });
    data.area = this.data.local;
    data.beatrole=this.data.beatrole;
    if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
    this.showBeat(data);
  },
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
  //  选择省时
    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    // 选择市
    if (val[1] != t[1]) {
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    // 选择县时
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
})
