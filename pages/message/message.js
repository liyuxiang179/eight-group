// pages/message/message.js
const app=getApp()
const AV=require('../../libs/av-core-min.js');

Page({
  data:{
    username:'',
    password:'',
    identity:'0',
    sex:'',
    age:'',
    height:'',
    weight:'',
  },

  inputNewusername(e){
    this.setData({
      username:e.detail.value,
    })
  },
  inputNewpassword(e){
    this.setData({
      password:e.detail.value,
    })
  },
  inputIdentity(e){
this.setData({
  identity:e.detail.value,
})
  },
  inputSex(e){
    this.setData({
      sex:e.detail.value,
    })
  },
  inputAge(e){
    this.setData({
      age:e.detail.value,
    })
  },
  inputHeight(e){
    this.setData({
      height:e.detail.value,
    })
  },
  inputWeight(e){
    this.setData({
      weight:e.detail.value,
    })
  },

register(){
  const {
    username,
    password,
    identity,
    sex,
    age,
    height,
    weight,
  }=this.data;
  const user= new AV.User();
  if (username) user.set({username});
  if (password) user.set({password});
  if (identity) user.set({identity});
  if (sex) user.set({sex});
  if (age) user.set({age});
  if (height) user.set({height});
  if (weight) user.set({weight});
  user.save().then(()=>{
    wx.showToast({
      title:'注册成功',
      icon:'sucess',
    });
  })
  .catch(error =>{
    wx.showToast({
      title:error.message,
      icon:'none'
    })
  });
}
})