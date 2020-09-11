//index.js
//获取应用实例
const app=getApp()
const AV=require('../../libs/av-core-min.js');

Page({
  data:{
    username:'',
    password:'',
      identity:'0',
  },

  inputUsername(e){
    this.setData({
      username:e.detail.value,
    })
    app.userInfo=this.data.username
  },
  inputPassword(e){
    this.setData({
      password:e.detail.value,
    })
  },
  
  Login1(){
    const{
      username,
      password,
    }=this.data;
    AV.User.logIn(username,password).then(function(loginedUser){
      wx.switchTab({
        url:'../menu/menu',
      });
      wx.showToast({
        title:'登录成功',
        icon:'sucess',
      })
      //登录成功，跳转到menu界面
    },
    function(error){
      alert(JSON.stringify(error));
    });
},
  Login2(){
    wx.navigateTo({
      url:'../message/message',
    })
  },
})
