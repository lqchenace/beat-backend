// pages/forum/fornumdetail/fornumdetail.js
const util = require("../../../utils/util.js");
const api = require("../../../utils/api.js");
let uid = wx.getStorageSync('openid');
let foid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumlist:[],
    publicurl: util.pictureurl,
    commentList: [],
    commentList1: [],
    firstcommment: true,
    showList: true,
    commentInput: '',
    reployperson: '',
    parentid: '0',
    uid2: '0',
    conuid2: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    foid=options.foid;
    this.getforumlist({ data: { foid: options.foid }, sort: 'comtime' });
    this.getCommentList({ foid: options.foid });
  },
  getforumlist: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/getforumlist', data).then(res => {
      console.log("sfsfsfsfsfsd", res);
      let resArr = []
      res.res.map((item, index) => {
        let itembeat = {};
        itembeat.foid = item.foid;
        itembeat.headimg = item.User.headimg;
        itembeat.headimgUrl = item.User.headimgUrl;
        itembeat.name = item.User.nickname;
        itembeat.command = item.command;
        itembeat.style = item.style;
        itembeat.title = item.title;
        itembeat.comtime = item.comtime;
        itembeat.clicknum = item.clicknum;
        itembeat.reploynum = item.reploynum;
        itembeat.imgurl = item.imgurl;
        itembeat.beatUrl = item.beatUrl;
        resArr.push(itembeat);
      });
        that.setData({
          forumlist: resArr
        });
    });
  },
  // 获取评论列表

  getCommentList: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/showforumComment', data).then(res => {
      console.log("pppppppppppppp", res);
      let len = 0;
      if (res.result.length != 0) {
        let resArr = [];
        res.result.map((item, index) => {
          let itembeat = {};
          itembeat.fcid = item.fcid;
          itembeat.uid = item.uid;
          itembeat.uid2 = item.uid2;
          itembeat.headimg = item.User.headimg;
          itembeat.headimgUrl = item.User.headimgUrl;
          itembeat.name = item.User.nickname;
          itembeat.comment = item.comment;
          itembeat.parentid = item.parentid;
          itembeat.comtime=item.comtime;
          resArr.push(itembeat);
        })
        that.setData({
          com_num: len,
          showList: true,
          commentList: resArr,
          firstcommment: true
        });
      } else {
        that.setData({ showList: false });
      }

    });
  },
  // 添加评论
  addComment: function (data) {
    let that = this;
    api.addSave('http://127.0.0.1:7001/addforumComment', data).then(res => {
      if (res == 1) {
        that.setData({ commentInput: '' });
        let data = { foid: foid };
        this.getCommentList(data);

      }
    })
  },
  // 点击发送评论
  confirmtap: function () {
    let comment = this.data.commentInput;
    let time = util.formatTime(new Date());
    let data = { foid: foid, uid: uid, comment: comment, comtime: time, parentid: '0', uid2: '0' };
    this.addComment(data);
  },
  // 监听评论的输入
  listenerSearchInput: function (e) {
    let val = e.detail.value;
    this.setData({
      commentInput: val
    })
  },
  // 评论一级评论
  groomuser: function (e) {
    let parentid = e.currentTarget.dataset.parentid;
    let nickname = e.currentTarget.dataset.nickname;
    let person = e.currentTarget.dataset.uid;
    if (person != uid)
      this.setData({ firstcommment: false, reployperson: nickname, parentid: parentid });
  },
  // 发送二级评论
  confirmsecondtap: function () {
    let comment = this.data.commentInput;
    let time = util.formatTime(new Date());
    let data = {};
    if (this.data.conuid2)
      data = { foid: foid, uid: uid, comment: comment, comtime: time, parentid: this.data.parentid, uid2: this.data.uid2 };
    else
      data = { foid: foid, uid: uid, comment: comment, comtime: time, parentid: this.data.parentid, uid2: '0' };
    this.addComment(data);
  },
  // 评论二级评论
  reployoneperson: function (e) {
    let pid = e.currentTarget.dataset.parentid;
    let pname = e.currentTarget.dataset.pname;
    let id = e.currentTarget.dataset.id;
    let fid = e.currentTarget.dataset.fid;
    let uid2 = e.currentTarget.dataset.uid2;
    // 不能评论自己
    if (id != uid) {
      // 当评论的是一级评论的人时，那么不需要设置uid2
      if (id == fid)
        this.setData({ firstcommment: false, reployperson: pname, parentid: pid, conuid2: false });
      else
        this.setData({ firstcommment: false, reployperson: pname, parentid: pid, uid2: uid2, conuid2: true });

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