// pages/announce/yuepaiform/yuepaiform.js
const app = getApp();
const util = require("../../../utils/util.js");
const api = require("../../../utils/api.js");
const tcity = require("../../../utils/city.js");
const sex = ['希望互免', '费用协商',"需要付费","愿意付费"];
let i=0;
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    imgshow:"",
    showmore:false,
    styleList: [],
    upimgarr:[],
    condition: false,
    provinces: [],
    citys: [],
    countys: [],
    value: [0, 0, 0],
    values: [0, 0, 0],
    province: "北京",
    city: "北京市",
    county: '东城区',
    role:'',
    area1:'请选择地区',
    area:'',
    conditionsort: false,
    val: [0],
    price:sex[0],
    sort: sex,
    command:'',
    phone:'',
    tooktime:'',
    tookplace:'',
    bid:'',
    code:false,
    rewalk:'',
    logo:false,
    pname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("hhhhhhh",options.sort);
    if (options.sort == '我是摄影师' || options.sort == '我是模特'){
      this.setData({ logo: true, bid: "fdg45d2" + Math.random().toString(36).substr(2) });
          wx.setNavigationBarTitle({
            title: '发布作品相册'
          })
    }else{
      this.setData({ logo: false, bid: "gstjj" + Math.random().toString(36).substr(2) });
              wx.setNavigationBarTitle({
                title: '发布约拍'
          })
    }
    this.getStyle();
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
      'countys': countys,
      role: options.sort
    })
  },
  citypicker1:function(){
   this.setData({code:false});
  },
  //上传表单和图片
  up:function(){
    // 获取约拍表单数据
    let data={};
    let that=this;
    // 测试手机号码的格式是否正确
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    let uid = wx.getStorageSync('openid');
    data.uid=uid;
    data.beatrole=this.data.role;
    data.area=this.data.area;
    data.costtype=this.data.price;
    data.tookplace=this.data.tookplace;
    data.tooktime = this.data.tooktime;
    data.command = this.data.command;
    data.phone = this.data.phone;
    let style=[];
     this.data.styleList.filter(item=>{
       if(item.checked==true)
       style.push(item.style);
     });
     data.style=style.join("#");
     data.bid=this.data.bid;
    if (this.data.area == '' || this.data.command == '' || style.length == 0 || !phoneCodeVerification.test(this.data.phone)){
       this.setData({ code: true, rewalk: '约拍理由、地区、风格不能为空、手机号码格式须正确' });
    }else{
      // 上传图片
        wx.uploadFile({
          url: 'http://127.0.0.1:7001/api/uploads',                  //服务器接口地址
          filePath: that.data.upimgarr[i],
          name: uid+"#"+that.data.bid+"#"+i,
          success: function (res) {
            // util.showSuccess('上传图片成功')
          }, complete: function (complete) {
            console.log("com",complete)
            i++;
            // 当图片都上传成功的时候就可以提交表单
            if (i == that.data.upimgarr.length) {
              let dd = JSON.parse(complete.data);
              data.imgurl = dd.data.imgurl;
              util.showSuccess('上传图片成功')
              api.addSave('http://127.0.0.1:7001/addBeat',data).then(res => {
                if(res==1)
                wx.navigateTo({
                  url: '../../wantBeathim/addSuccess/addSuccess',
                })
              })
            } else if (i < that.data.upimgarr.length) {      //若图片还没有传完，则继续调用函数
              that.up()
            }
          },
          fail: function (e) {
            util.showModel('上传图片失败')
            console.error(e);
          }
        })
    }
  },
  // 发布作品相册
  upproduct: function () {
    // 获取约拍表单数据
    let data = {};
    let that = this;

    let uid = wx.getStorageSync('openid');
    data.uid = uid;
    data.pname = this.data.pname;
    data.device = this.data.tookplace;
    data.place = this.data.tooktime;
    data.pdetail = this.data.command;
    let style = [];
    this.data.styleList.filter(item => {
      if (item.checked == true)
        style.push(item.style);
    });
    data.style = style.join("#");
    data.pid = this.data.bid;
    // console.log(data);
    if (this.data.pname == '' || this.data.command == '' || style.length == 0 ) {
      this.setData({ code: true, rewalk: '作品相册名称和描述、风格不能为空' });
    } else {
      // 上传图片
      wx.uploadFile({
        url: 'http://127.0.0.1:7001/api/uploads',                  //服务器接口地址
        filePath: that.data.upimgarr[i],
        name: uid + "#" + that.data.bid + "#" + i,
        success: function (res) {
          // util.showSuccess('上传图片成功')
        }, complete: function (complete) {
          // console.log("com", complete)
          i++;
          // 当图片都上传成功的时候就可以提交表单
          if (i == that.data.upimgarr.length) {
            let dd = JSON.parse(complete.data);
            data.imgurl = dd.data.imgurl;
            util.showSuccess('上传图片成功')
            api.addSave('http://127.0.0.1:7001/addBeat', data).then(res => {
              if (res == 1)
                wx.navigateTo({
                  url: '../../wantBeathim/addSuccess/addSuccess',
                })
            })
          } else if (i < that.data.upimgarr.length) {      //若图片还没有传完，则继续调用函数
            that.upproduct()
          }
        },
        fail: function (e) {
          util.showModel('上传图片失败')
          console.error(e);
        }
      })
    }
  },
  //点击发布
  announcebeat: function () {
    if(this.data.logo){
      this.upproduct();
    }else
      this.up();
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
  closesort: function () {
    this.setData({
      conditionsort: false
    })
  },
  bindChangesort: function (e) {
    var v = e.detail.value;
    this.setData({ val: v });
  },
  // 选择地区
  confirmplace: function () {
    let area = this.data.province + "#" + this.data.city + "#"+this.data.county;
    let area1 = this.data.province + "-" + this.data.city + "-" + this.data.county;
    this.setData({ area: area, area1: area1, condition: false});
   console.log(area);
  },
  // 选择费用
  getconfirmval: function () {
    this.setData({ price: sex[this.data.val], conditionsort: false });
  },
  // 监听约拍理由的输入
  listenercommand: function (e) {
    this.setData({
      command: e.detail.value
    })
  },
  // 监听手机号码的输入
  listenerphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 监听作品标题的输入
  listenername: function (e) {
    this.setData({
      pname: e.detail.value
    })
  },
  // 监听拍摄时间的输入
  listenertime: function (e) {
    this.setData({
      tooktime: e.detail.value
    })
  },
  // 监听拍摄地点的输入
  listenerplace: function (e) {
    this.setData({
      tookplace: e.detail.value
    })
  },
  opensort: function (e) {
    this.setData({
      conditionsort: true
    })
  },
  // 获取主题分类
  getStyle: function () {
    let that = this;
    api.getTheStyle('http://127.0.0.1:7001/ShowTheStyle').then(res => {
      // console.log(res);
      let resArr = []
      res.map((item, index) => {
        if (item.style!="全部")
        resArr.push({style:item.style,checked:false})
      })
      that.setData({ styleList: resArr })
    })
  },
  // 选择主题风格
  clickStyle: function (e) {
    let t = e.currentTarget.dataset.true;
    let s=this.data.styleList.map((item,index)=>{
        if(index==t){
        item.checked=!item.checked;
        }
        return item;
    })
    this.setData({ styleList:s });
    },
  // 显示更多选项
  showmore:function(){
    this.setData({showmore:!this.data.showmore});
  },
  //上传图片
  upImgClick: function (e) {
   var that=this;
    wx.chooseImage({
      count: 9,                                           //一次上传图片数量
      sizeType: ['compressed'],                           //图片大小
      sourceType: ['album', 'camera'],
      success: function (res) {
        // util.showBusy('正在上传')
        var filePath = res.tempFilePaths;
        that.setData({ upimgarr: filePath});
        console.log(res);            //获取图片路径
      },
      fail: function (e) {
        console.error(e)
      }
    })
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