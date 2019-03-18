// pages/filterInfo/StyleandWorks/StyleandWorks.js
const api = require("../../../utils/api.js");
const util = require("../../../utils/util.js");

const sort=["约摄影师","约模特","作品相册"];
// 地区列表引入
const tcity = require("../../../utils/city.js");
const sex = ['男', '女'];

const style = ["cosplay", "情绪", "校园", "森系", "清新"];
const list = [{
  headimg: "../../../images/test/headimg.jpg",
  name: "溜影",
  role: "摄影师",
  city: "深圳市",
  behavior: "约模特",
  cost: "希望互免",
  command: "发挥司法害死大放送很舒服设计费舒服舒服积分金佛寺发挥司法死哦斐济水是否is金佛山金佛山偶是附件四姐夫金佛山积分是否搜金佛山",
  tookimg: ['../../../images/test/test1.jpg', '../../../images/test/test2.jpg', '../../../images/test/test3.jpg'],
  sortlabel: ["cosplay", "情绪", "校园", "森系", "清新"],
  receiveBeat: 4,
  readcount: 15
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  sortList:sort,
  styleList:[],
  itemList: null,
  publicurl: util.pictureurl,
  thetypestyle:0,
  isClicked:0,
  conproduct:true,
    local: '地区',
    gender: '性别', 
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStyle();
    if (options.type) {
      if (options.type == "style"){
        wx.setNavigationBarTitle({
          title: '推荐风格'
        })
        this.getTheResultList('约摄影师','全部',this.data.local,this.data.gender);
      }
      else {
        wx.setNavigationBarTitle({
          title: '推荐作品相册'
        })
        this.setData({ isClicked: 2, conproduct:false});
        this.getTheResultList('作品相册', '全部', this.data.local, this.data.gender);
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
  // 点击分类
  clickStyle:function(e){
    let type = e.currentTarget.dataset.theme;
    this.setData({ thetypestyle: e.currentTarget.dataset.true});
    let s;
    if (this.data.gender == '男')
      s = 1;
    else if (this.data.gender == '女')
      s = 2;
    else
      s = this.data.gender;
    this.getTheResultList(this.data.sortList[this.data.isClicked], type,this.data.local, s);
  },
  // 点击侧边栏分类筛选
  clickcolStyle:function(e){
    let theme = e.currentTarget.dataset.themecolumn;
    if (e.currentTarget.dataset.index!=2)
      this.setData({ conproduct: true});
    else{
      this.setData({ conproduct: false });
    }  
    this.setData({ isClicked: e.currentTarget.dataset.index });
    let s;
    if (this.data.gender == '男')
      s = 1;
    else if (this.data.gender == '女')
      s = 2;
    else
      s = this.data.gender;
    this.getTheResultList(theme, this.data.styleList[this.data.thetypestyle], this.data.local, s);
  },
  // 获取主题分类
  getStyle:function(){
   let that=this;
    api.getTheStyle('http://127.0.0.1:7001/ShowTheStyle').then(res=>{
      let resArr = []
      res.map((item, index) => {
        resArr.push(item.style);
      })
      that.setData({ styleList: resArr})
    })
  },

  getTheResultList(beatrole,style,area,gender){
    let that = this;
    let param={
      beatrole: beatrole,
      style: style,
      area:area,
      sex:gender
    }
    api.addSave('http://127.0.0.1:7001/getProductlist', param).then(res => {
      console.log("666666666666",res);
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        if (item.bid){
        itembeat.bid = item.bid;
        item.uid = item.User.uid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.sex = item.User.sex;
        itembeat.name = item.User.nickname;
        itembeat.role = item.User.role;
        itembeat.city = item.area.split("#")[1];
        itembeat.behavior = item.beatrole;
        itembeat.cost = item.costtype;
        itembeat.sortlabel = item.style.split("#");
        itembeat.tookimg = item.imgurl;
        itembeat.beatUrl = item.beatUrl;
        }
        else{
          itembeat.pid = item.pid;
          itembeat.headimg = item.User.headimg;
          itembeat.headimgUrl = item.User.headimgUrl;
          itembeat.sex = item.User.sex;
          itembeat.name = item.User.nickname;
          itembeat.title = item.pname;
          itembeat.sortlabel = item.style.split("#");
          itembeat.tookimg = item.imgurl;
          itembeat.beatUrl = item.beatUrl;
        }
        resArr.push(itembeat);
      })
      that.setData({
        itemList: resArr
      });
    })
  },

  // 性别的过滤
  getconfirmval: function () {
    let data = {};
    this.setData({ gender: sex[this.data.val] });
    this.setData({ conditionsort: false });
    data.area = this.data.local;
    if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
         // 调用接口
    this.getTheResultList(this.data.sortList[this.data.isClicked], this.data.styleList[this.data.thetypestyle], data.area, data.sex);
  },

  // 地区过滤
  confirmplace: function () {
    let data = {};
    console.log("dddddddd", this.data.values);
    this.setData({ condition: false, local: this.data.cityData[this.data.values[0]].sub[this.data.values[1]].name });
    data.area = this.data.local;
    if (this.data.gender == '男')
      data.sex = 1;
    else if (this.data.gender == '女')
      data.sex = 2;
    else
      data.sex = this.data.gender;
      // 调用接口
    this.getTheResultList(this.data.sortList[this.data.isClicked], this.data.styleList[this.data.thetypestyle], data.area, data.sex);
  },
// 跳转详情页面
  linkTodetail:function(e){
    let id = e.currentTarget.dataset.id;
    let logo = this.data.sortList[this.data.isClicked];
    let u = wx.getStorageSync('openid');
    wx.navigateTo({
      url: '../../Beatdetails/Beatdetails?id=' + id + '&uid='+u+'&logo=' +logo,
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