//menu.js
// const requestUrl = require('../../config').requestUrl
var pageIndex = 1;
var pageSize = 20;
var loadFlag = false;
const app=getApp()
Page({
  data: {
    message: "",
  },
  onLoad:function(e){
    this.setData({
      message:app.userInfo,
    })
  },
  //点击标签
  bindTagTap: function (e) {
    wx.navigateTo({
      url: '../result/result?KeyWord=' + e.currentTarget.dataset.id
    })
  },

  //图片预览
  bindShowImage: function (e) {
    wx.previewImage({
      urls: [e.target.dataset.url]
    })
  },
  bindNewTap(){
    wx.navigateTo({
      url:'../kepu/kepu',
    })
  },

})