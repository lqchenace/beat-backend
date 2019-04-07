// pages/forum/forum.js
const sort=["全部","技术","生活"];
const util = require("../../utils/util.js");
const api = require("../../utils/api.js");

const getInf = (str, key) => str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
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
    showsort:false,
    keyName:'',
    listDataCopy: [],
    searchlogo:false,
    key:''
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
    api.addSave(util.pictureurl +'getforumlist', data).then(res => {
      let resArr = []
      // console.log("0000000", res.res);
      res.res.map((item, index) => {
        let itembeat = {};
        itembeat.foid = item.foid;
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
  // 切换分类时
  seclectsort:function(e){
    let s=e.target.dataset.style;
    this.setData({ showsort: false,sort:s});
    let data = { key: this.data.keyName, style: this.data.sort };
      this.getsearch(data);
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
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    } else {
    api.getBlack().then(res => {
      if (res[0].black == 1) {
        wx.showToast({
          title: '您好，您目前没有权限执行此操作',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.navigateTo({
          url: './post/post',
        })
      }
    })
    }
  },
  // 实时监听输入框输入的内容
  searchInputAction:function(e){
    let that = this
    let value = e.detail.value
    if(value.length==0)
      this.setData({
        listDataCopy: []
      })
      this.setData({
        key: that.trim(e.detail.value),
        keyName: that.trim(e.detail.value)
      })
    let data={key:value,style:this.data.sort};
    if (value.length > 0)
     this.getsearch(data);
  },
  // 去除首尾的空格
  trim: function (s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
//  获取搜索结果
  getsearch: function (data) {
    let that = this;
    api.addSave(util.pictureurl +'getforumsearchresult', data).then(res => {
      that.setData({
        listDataCopy: res
      })
      var data = res;
      var newData = that.data.listDataCopy;
      for (var i = 0; i < data.length; i++) {
        var dic = data[i];
        var newDic = newData[i];
        var fund_name = dic.title;
        newDic.title = getInf(fund_name, that.data.keyName);
      }
      
      that.setData({
        listDataCopy: newData,
      })
    })
  },
  // 点击搜索按钮
  searchingessay:function(){
    let that = this;
    let data = { key: this.data.keyName, style: this.data.sort };
    api.addSave(util.pictureurl +'getthesearchresult', data).then(res => {
      console.log(res);
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        itembeat.foid = item.foid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.name = item.User.nickname;
        itembeat.command = item.command;
        itembeat.style = item.style;
        itembeat.title = getInf(item.title, that.data.keyName);
        itembeat.comtime = item.comtime;
        itembeat.clicknum = item.clicknum;
        itembeat.reploynum = item.reploynum;
        resArr.push(itembeat);
      });
      that.setData({
        forumlist: resArr,
        listDataCopy: [],
        key: '',
        searchlogo:true,
        currentData:0
      })
    })
  },
  // 点击实时搜索结果的某一列
  getthelist:function(e){
    let a = e.currentTarget.dataset.foid;
    this.setData({
      listDataCopy: [],
      key:'',
      currentData: 0,
      searchlogo: true
    })
    this.getforumlist({ data: {foid:a}, sort: 'comtime' });
  },
  getforumdetail:function(e){
    let foid = e.currentTarget.dataset.foid;
    let clicknum = e.currentTarget.dataset.clicknum+1;
    let sort= e.currentTarget.dataset.sort;
    let data ={};
    data.data={clicknum:clicknum};
    data.data1={foid:foid};
    api.addSave(util.pictureurl +'updateinfo', data).then(res => {
         if(res[0]==1){
               wx.navigateTo({
                url: './fornumdetail/fornumdetail?foid='+foid,
              })
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
    this.getforumlist({ data: {}, sort: 'comtime' });
    this.getforumlist({ data: {}, sort: 'reploynum' });
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