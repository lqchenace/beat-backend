// pages/filterInfo/filterInfo.js
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
// 地区列表引入
const tcity = require("../../utils/city.js");
const sex = ['男', '女'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶层筛选列表
    condition: false,
    conditionsort: false,
    sort: sex,
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    province: "",
    city: "",
    county: '',
    val: [0],
    // 模特或摄影师列表信息
    modelInfo:[],
    publicurl: util.pictureurl,
    local: '地区',
    gender: '性别', 
    role:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      if(options.type=="model"){
        wx.setNavigationBarTitle({
          title: '推荐模特'
        })
        this.setData({role:'模特'});
      this.getSortResult({role:'模特'});
      }
      else{
        wx.setNavigationBarTitle({
          title: '推荐摄影师'
        })
        this.setData({ role: '摄影师' });
        this.getSortResult({ role: '摄影师' });
        }
    }
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

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
  },
  // 获取推荐结果
  getSortResult:function(data){
    let that = this;
    api.addSave(util.pictureurl +'FilterInfo', data).then(res => {
      console.log("ffffffff",res);
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        itembeat.uid = item.uid;
        itembeat.name = item.nickname;
        itembeat.city = item.address.split("#")[1];
        itembeat.gender = item.sex;
        itembeat.img = item.imgurl[0];
        itembeat.beatUrl = item.headimg;
        resArr.push(itembeat);
      })
      let firstlist=[], secondlist=[];
      console.log(res.length);
      if (resArr.length%2==0){
        firstlist = resArr.slice(0, resArr.length/2);
        secondlist = resArr.slice(resArr.length / 2);
      }else{
        firstlist = resArr.slice(0, resArr.length / 2+1);
        secondlist = resArr.slice(resArr.length / 2+1);
      }
      that.setData({
        modelInfo: [firstlist, secondlist]
      });
    })
  },
  userhome: function (e) {
    let u = e.currentTarget.dataset.uid;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../my/myHome/myHome?name=' + name + '&uid=' + u,
    })
  },
  openarea: function (e) {
    this.setData({
      condition: !this.data.condition
    })
  },
  // 点击"地区"时弹出地区选择框
  open: function () {
    this.setData({
      condition: false
    })
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
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
  },
  // 性别的过滤
  getconfirmval: function () {
    let data = {};
      this.setData({ gender: sex[this.data.val] });
    this.setData({ conditionsort: false });
    data.role=this.data.role;
    data.area = this.data.local;
    if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
    this.getSortResult(data);
  },
  // 地区过滤
  confirmplace: function () {
    let data = {};
    console.log("dddddddd",this.data.values);
    this.setData({ condition: false, local: this.data.cityData[this.data.values[0]].sub[this.data.values[1]].name});
    data.role = this.data.role;
    data.area = this.data.local;
     if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
    this.getSortResult(data);
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