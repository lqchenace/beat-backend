const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// const pictureurl ='http://192.168.0.106:7001/';
const pictureurl = 'http://127.0.0.1:7001/';
// 显示繁忙提示
var showBusy=text=>wx.showToast({
  title: '正在上传',
  icon:'loading',
  duration:10000
})
//显示成功提示

var showSuccess=text=>wx.showToast({
  title: '成功',
  icon:'success'
})

// 显示失败提示
var showModel=(title,content)=>{
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel:false
  })
}
module.exports = {
  formatTime: formatTime,
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
  pictureurl: pictureurl
}
