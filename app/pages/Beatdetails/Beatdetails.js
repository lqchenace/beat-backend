// pages/Beatdetails/Beatdetails.js
//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
var uid='';
var bid='';
// 约拍列表测试对象
const list = [{
  headimg: "../../images/test/headimg.jpg",
  name: "溜影",
  role: "摄影师",
  city: "深圳市",
  behavior: "约模特",
  cost: "希望互免",
  command: "发挥司法害死大放送很舒服设计费，舒服舒服积分金佛寺发挥司法死哦斐济水是否金，佛山金佛山偶是附件四姐夫金佛山积分是否搜金佛山",
  tookimg: ['../../images/test/test1.jpg', '../../images/test/test4.jpg', '../../images/test/test6.jpg', '../../images/test/test7.jpg', '../../images/test/test2.jpg', '../../images/test/test3.jpg'],
  sortlabel: ["cosplay", "情绪", "校园", "森系", "清新"],
  receiveBeat: 4,
  readcount: 15,
  tooktime:"下午三点左右开始",
  place:"草场地",
  imgsum:"50张左右"
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    confirmsave:false,
    publicurl: util.pictureurl,
    confirmshow:true,
    con_discuss:false,
    com_num:0,
    commentList:[],
    commentInput:'',
    isfixed:false,
    showList:true,
    arrianList:[],
    arrianbeatnum:0,
    groom:'',
    groomList:[],
    logo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id&&options.logo){
      console.log("rrrrrrrrr",options.id);
      if(options.logo=='作品相册'){
        this.setData({ confirmshow: false, logo: options.logo});
        this.getBeatDetails({ pid: options.id });
      }else{
        this.setData({logo: '约拍'});
        let data = { bid: options.id, uid: options.uid };
        this.getBeatDetails({bid:options.id});
        this.getArrianList({ bid: options.id });
        this.showmysave(data);
      }
    }
    uid = options.uid;
    bid = options.bid||options.id;
    console.log("345",options,bid);
  if(options.bid){
    this.setData({ logo: '约拍' });
    //显示约拍详情
    this.getBeatDetails({bid:options.bid});
    // 显示收到的约拍
    this.getArrianList({ bid: options.bid });
  } 
  if(options.bid&&options.uid){
    let data = { bid: options.bid, uid: options.uid};
    this.showmysave(data);
  }
  },
  // 获取约拍详情
  getBeatDetails:function(data){
    let that = this;
    api.getArranceBeatDetails(data).then(res=>{
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        if(item.bid){
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.sex = item.User.sex;
        itembeat.name = item.User.nickname;
        itembeat.role = item.User.role;
        itembeat.city = item.area.split("#")[1];
        itembeat.behavior = item.beatrole;
        itembeat.cost = item.costtype;
        itembeat.command = item.command;
        itembeat.sortlabel = item.style.split("#");
        that.setData({ groom: item.style.split("#")[0]});
        itembeat.tookimg = item.imgurl;
        itembeat.beatUrl = item.beatUrl;
        itembeat.tooktime=item.tooktime;
        itembeat.place = item.tookplace;
          // 显示推荐约拍
        that.getGroomList({ sort: 'beat', style: that.data.groom,uid:item.uid});
      }else{
          itembeat.headimg = item.User.headimg;
          itembeat.headimgUrl = item.User.headimgUrl;
          itembeat.sex = item.User.sex;
          itembeat.name = item.User.nickname;
          itembeat.role = item.User.role;
          itembeat.command = item.pdetail;
          itembeat.sortlabel = item.style.split("#");
          that.setData({ groom: item.style.split("#")[0] });
          itembeat.tookimg = item.imgurl;
          itembeat.beatUrl = item.beatUrl;
          itembeat.place = item.place;
          itembeat.device = item.device;
          // 显示推荐约拍
          that.getGroomList({ sort: 'product', style: that.data.groom, uid: item.uid });
      }
        resArr.push(itembeat);
      })
      that.setData({
        itemList: resArr
      });
    })
  },
  // 显示推荐信息
  getGroomList:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/showGroom', data).then(res => {
      console.log("ssssssssss",res);
      let resArr = []
      res.map((item, index) => {
        let itembeat = {};
        itembeat.id=item.bid||item.pid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        if (item.bid) {
          itembeat.command = item.command;
        } else {
          itembeat.command = item.pdetail;
        }
        resArr.push(itembeat);
      })
      that.setData({
        groomList: resArr
      });
    })
  },
  //从推荐列表去详情
  groomToDetail:function(e){
    let id = e.currentTarget.dataset.id;
    let logo = this.data.logo;
    let u = wx.getStorageSync('openid');
    wx.navigateTo({
      url: './Beatdetails?id=' + id + '&uid=' + u + '&logo=' + logo,
    })
  },
  // 读取收藏信息
  showmysave:function(data){
    let that = this;
    api.getMySave(data).then(res=>{
      if(res.length==0){
        that.setData({
          confirmsave:false
        })
      }else{
        that.setData({
          confirmsave: true
        })
      }
    });
  },
//  返回首页
  goback:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 获取约拍他的列表
  getArrianList(data){
    let that=this;
    api.addSave('http://127.0.0.1:7001/showArrianbeatList', data).then(res => {
      let resArr = [];
      res.map((item, index) => {
        let itembeat = {};
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.headimg= item.User.headimg;
        resArr.push(itembeat);
      })
      that.setData({
        arrianList: resArr,
        arrianbeatnum:res.length
      });
    });
  },
  // 收藏约拍信息
  confirmsave:function(){
    let that=this;
    let data = { bid:bid,uid:uid };
    if (this.data.confirmsave==false){
      api.addSave('http://127.0.0.1:7001/addSave',data).then(res=>{
        if(res!=null){
            that.setData({
              confirmsave:true
            })
        }
      });
    }else{
      api.addSave('http://127.0.0.1:7001/deleteSave', data).then(res => {
        if (res ==1) {
          that.setData({
            confirmsave: false
          })
        }
      });
    }
  },
  getCommentList:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/showBeatComment', data).then(res => {
      console.log("pppppppppppppp",res);
      // that.setData({ com_num:res.length});
      let len=0;
      if(res.length!=0){
      let resArr = [];
      res.map((item, index) => {
        if(item.parentid=='0')
        len++;
        let itembeat = {};
          itembeat.bcid=item.bcid;
          itembeat.headimg = item.User.headimg;
          itembeat.headimgUrl = item.User.headimgUrl;
          itembeat.name = item.User.nickname;
          itembeat.comment =item.comment;
          itembeat.parentid=item.parentid;
          resArr.push(itembeat);
      })
      that.setData({
        com_num: len,
        showList: true,
        commentList: resArr
      });
      }else{
        that.setData({ showList: false});
      }
    });
  },
  // 添加评论
  addComment:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/addComment', data).then(res => {
     if(res==1){
       that.setData({commentInput:''});
       let data = { bid: bid };
       this.getCommentList(data);

     }
    })
  },
  // 点击弹出评论区
  showDiscusss:function(){
    this.setData({ con_discuss: true, isfixed: true});
    let data = { bid: bid };
    this.getCommentList(data);
  },
  // 隐藏评论列表
  hideDiscusss:function(){
    this.setData({ con_discuss: false, isfixed: false});
  },
  // 监听评论的输入
  listenerSearchInput: function (e) {
    this.setData({
      commentInput: e.detail.value
    })
  },
  // 点击发送评论
  confirmtap:function(){
   let comment=this.data.commentInput;
   let time = util.formatTime(new Date());
   let data={bid:bid,uid:uid,comment:comment,comtime:time,parentid:'0'};
    this.addComment(data);
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