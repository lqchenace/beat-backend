const util = require("./util.js");
const api = {
    //获取约拍列表信息信息
    getArranceBeatInfo:function(data){
      return new Promise((resolve, reject) => {
        wx.request({
          url: util.pictureurl+'showBeat',
          header: {
            'content-type': 'application/json'
          },
          dataType: 'json',
          method:'POST',
          data:{data},
          success: res => {
            if(res.data.code==200){
              let data = res.data.data;
              resolve(data);
            }else{
              reject();
            }

          }
        })
      })
    },
    // 获取主题分类
  getTheStyle: function (url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success: res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            resolve(data);
          } else {
            reject();
          }

        }
      })
    })
  },

  // 获取用户信息
  getBlack: function () {
    let uid = wx.getStorageSync('openid');
    // console.log("openid",uid);
    return new Promise((resolve, reject) => {
      wx.request({
        url: util.pictureurl +'queryUser?uid='+uid,
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success: res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            resolve(data);
          } else {
            reject();
          }

        }
      })
    })
  },
  //获取约拍详情
  getArranceBeatDetails: function (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: util.pictureurl +'showBeatDetails',
        header: {
          'content-type': 'application/json'
        },
        data:{
         data
        },
        method: 'POST',
        dataType: 'json',
        success: res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            resolve(data);
          } else {
            reject();
          }

        }
      })
    })
  },

  //显示收藏信息
  getMySave: function (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: util.pictureurl +'showmySave',
        header: {
          'content-type': 'application/json'
        },
        data:{data},
        method: 'POST',
        dataType: 'json',
        success: res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            resolve(data);
          } else {
            reject();
          }

        }
      })
    })
  },

  //添加与取消收藏 显示我的收藏列表  显示个人主页
  addSave: function (url,data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header: {
          'content-type': 'application/json'
        },
        data: { data },
        method: 'POST',
        dataType: 'json',
        success: res => {
          if (res.data.code == 200) {
            let data = res.data.data;
            resolve(data);
          } else {
            reject();
          }

        }
      })
    })
  },

}

module.exports= api;