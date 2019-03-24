// pages/Beatdetails/Beatdetails.js
//获取应用实例
const app = getApp();
const api = require("../../utils/api.js");
const util = require("../../utils/util.js");
var uid='';
var bid='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    confirmsave:false,
    confirmfull: false,
    publicurl: util.pictureurl,
    confirmshow:true,
    con_discuss:false,
    com_num:0,
    commentList:[],
    commentList1:[],
    commentInput:'',
    isfixed:false,
    showList:true,
    arrianList:[],
    arrianbeatnum:0,
    groom:'',
    groomList:[],
    logo:'',
    firstcommment:true,
    reployperson:'',
    parentid:'0',
    uid2:'0',
    conuid2:false,
    fullnumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id&&options.logo){
      console.log("rrrrrrrrr",options.id);
      let data = { bid: options.id, uid: options.uid };
      if(options.logo=='作品相册'){
        this.setData({ confirmshow: false, logo: options.logo});
        this.getBeatDetails({ pid: options.id });
        this.showmyfull(data);
        this.getfullnum({ bid: options.id });
      }else{
        this.setData({logo: '约拍'});
        this.getBeatDetails({bid:options.id});
        this.getArrianList({ bid: options.id });
        this.showmysave(data);
        this.showmyfull(data);
        this.getfullnum({ bid: options.id });
      }
      if (options.bcid) {
        console.log("rrfsfsfrr");
        let data = { bid: options.id };
        this.getCommentList(data);
        this.setData({ con_discuss: true,
                     isfixed: true ,
                     conuid2:true,
                     paeentid:options.parentid,
                     uid2:options.bcid,
                     firstcommment:false,
                     reployperson:options.name
                     });
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
    // 获取点赞数量
    this.getfullnum({ bid: options.bid });
  } 
  if(options.bid&&options.uid){
    let data = { bid: options.bid, uid: options.uid};
    this.showmysave(data);
    this.showmyfull(data);
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
  // 读取点赞信息
  showmyfull: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/showmyFull', data).then(res => {
      if (res.length == 0) {
        that.setData({
          confirmfull: false
        })
      } else {
        that.setData({
          confirmfull: true
        })
      }
    });
  },
  // 读取点赞信息
  getfullnum: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/getfullnum', data).then(res => {
     that.setData({fullnumber:res.fullnum[0].num});
    });
  },
//  返回首页
  goback:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 跳转约拍界面
  beathim:function(){
   wx.navigateTo({
     url: '../wantBeathim/wantBeathim?bid='+bid,
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
  // 点赞或取消点赞 
  confirmfull:function(){
    let that = this;
    let data = { bid: bid, uid: uid };
    if (this.data.confirmfull == false) {
      api.addSave('http://127.0.0.1:7001/addFull', data).then(res => {
        if (res != null) {
          that.setData({
            confirmfull: true
          })
          // 获取点赞数量
          this.getfullnum({ bid: bid });
        }
      });
    } else {
      api.addSave('http://127.0.0.1:7001/deleteFull', data).then(res => {
        if (res == 1) {
          that.setData({
            confirmfull: false
          })
        }
      });
      // 获取点赞数量
      this.getfullnum({ bid: bid });
    }
  },
  getCommentList:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/showBeatComment', data).then(res => {
      console.log("pppppppppppppp",res);
      let len=0;
      if (res.result.length!=0){
      let resArr = [];
      res.result.map((item, index) => {
        if(item.parentid=='0')
        len++;
        let itembeat = {};
          itembeat.bcid=item.bcid;
          itembeat.uid=item.uid;
          itembeat.uid2=item.uid2;
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
        commentList: resArr,
        firstcommment: true
      });
      }else{
        that.setData({ showList: false});
      }
      let arr = [];
      res.res.map((item, index) => {
        let itembeat = {};
        itembeat.bcid = item.bcid;
        itembeat.uid = item.uid;
        itembeat.uid2 = item.uid2;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.name = item.User.nickname;
        itembeat.comment = item.comment;
        itembeat.parentid = item.parentid;
        arr.push(itembeat);
      })
      that.setData({
        commentList1: arr,
      });
    });
  },
  // 添加评论
  addComment:function(data){
    let that = this;
    api.addSave('http://127.0.0.1:7001/addComment', data).then(res => {
     if(res==1){
       that.setData({ commentInput: ''});
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
    let val = e.detail.value;
    val=val.replace(/[0-9]+|[a-z]+|[A-Z]+/g,"*");
    this.setData({
      commentInput: val
    })
  },
  // 点击发送评论
  confirmtap:function(){
   let comment=this.data.commentInput;
   let time = util.formatTime(new Date());
   let data={bid:bid,uid:uid,comment:comment,comtime:time,parentid:'0',uid2:'0'};
    this.addComment(data);
  },
  // 发送二级评论
  confirmsecondtap:function(){
    let comment = this.data.commentInput;
    let time = util.formatTime(new Date());
    let data={};
    if(this.data.conuid2)
      data = { bid: bid, uid: uid, comment: comment, comtime: time, parentid: this.data.parentid, uid2: this.data.uid2};
    else
      data = { bid: bid, uid: uid, comment: comment, comtime: time, parentid: this.data.parentid, uid2:'0' };
    this.addComment(data);
  },
  // 评论一级评论
  groomuser:function(e){
    let parentid = e.currentTarget.dataset.parentid;
    let nickname= e.currentTarget.dataset.nickname;
    let person = e.currentTarget.dataset.uid;
    if(person!=uid)
     this.setData({ firstcommment: false, reployperson:nickname,parentid:parentid});
  },
  // 评论二级评论
  reployoneperson:function(e){
    let pid= e.currentTarget.dataset.parentid;
    let pname = e.currentTarget.dataset.pname;
    let id = e.currentTarget.dataset.id;
    let fid = e.currentTarget.dataset.fid;
    let uid2 = e.currentTarget.dataset.uid2;
// 不能评论自己
    if(id!=uid){
      // 当评论的是一级评论的人时，那么不需要设置uid2
      if(id==fid)
        this.setData({ firstcommment: false, reployperson: pname, parentid: pid,conuid2:false });
       else
        this.setData({ firstcommment: false, reployperson: pname, parentid: pid,uid2:uid2, conuid2: true });

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