// pages/search/search.js
const requestUrl = require('../../config').requestUrl

var getTagData = function (that) {
  wx.request({
    url: requestUrl + 'wxTagListGet.ashx',
    success: function (res) {
      that.setData({
        tagList: res.data.ChinaValue
      })
    }
  })
}

var search = function (that) {
  if (that.data.key.length > 0) {
    wx.navigateTo({
      url: '../result/result?KeyWord=' + that.data.key
    })
  }
  else {
    wx.showToast({
      title: '输入关键字',
      image: "../../images/icon-no.png",
      mask: true,
      duration: 1000
    })
  }
}

  

Page({
  data: {
    key: '',
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    age: '',
    height: '',
    weight: '',
    bmi: '',
    work:'',
    workArray: [
      { "ID": 1, "Name1": "以站为主"  },
      { "ID": 2, "Name1": "以动为主"  },
      { "ID": 3, "Name1": "  其他  "  }
    ],
    workIndex: 0,
    fruit: '',
    meat: '',
    exercise: '',
    sun: '',
    menopause: '',
    tea: '',
    sweat:'',
    sweatArray: [
      { "ID": 1, "Name2": "少量"  },
      { "ID": 2, "Name2": "中量"  },
      { "ID": 3, "Name2": "大量"  }
    ],
    sweatIndex: 0,
    hypertension:'',
    hypertensionArray: [
      { "ID": 1, "Name3": "是  "  },
      { "ID": 2, "Name3": "否  "  }
    ],
    hypertensionIndex: 0,
    levelArray:[
      { "Name": "低危" },
      { "Name": "中危" },
      { "Name": "高危" }
    ]
  },

  //事件处理函数
  formSearch: function () {
    search(this)
  },

  //点击标签
  bindTagTap: function (e) {
    wx.navigateTo({
      url: '../result/result?KeyWord=' + e.currentTarget.dataset.id
    })
  },

  //长按封面图 重新加载
  bindRefresh: function () {
    getTagData(this)
  },

  bindKeyInput: function (e) {
    this.setData({
      key: e.detail.value
    })
  },

  bindInputSearch: function () {
    search(this)
  },

  onLoad: function () {
    var that = this

    //调用应用实例的方法获取全局数据
    var app = getApp()
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  onShow: function () {
    var that = this
    that.setData({
      key: ''
    })
    getTagData(that)
  },


  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  ageInput:function(e){
    this.setData({
      age: e.detail.value
    })
  },
  heightInput:function(e){
    this.setData({
      height: e.detail.value
    })
  },
  weightInput:function(e){
    this.setData({
      weight: e.detail.value
    })
  },
  
  bindworkChange: function (e) {
    this.setData({
      workIndex: e.detail.value
    })
  },
  workInput:function(e){
    this.setData({
      work: e.detail.value
    })
  },
  
  fruitInput: function (e) {
    this.setData({
      fruit: e.detail.value
    })
  },
  
  meatInput: function (e) {
    this.setData({
      meat: e.detail.value
    })
  },

  exerciseInput: function (e) {
    this.setData({
      exercise: e.detail.value
    })
  },
  sunInput: function (e) {
    this.setData({
      sun: e.detail.value
    })
  },
  menopauseInput: function (e) {
    this.setData({
      menopause: e.detail.value
    })
  },
  teaInput: function (e) {
    this.setData({
      tea: e.detail.value
    })
  },
  bindsweatChange: function (e) {
    this.setData({
      sweatIndex: e.detail.value
    })
  },
  sweatInput:function(e){
    this.setData({
      sweat: e.detail.value
    })
  },
  bindhypertensionChange: function (e) {
    this.setData({
      hypertensionIndex: e.detail.value
    })
  },
  hypertensionInput:function(e){
    this.setData({
      hypertension: e.detail.value
    })
  },
  //计算
  calculateBtn:function(e){
      if (this.data.currentTab==0){
      var StartNum = 3500;
      if (this.data.age == ""||this.data.height == ""||this.data.weight == ""||this.data.fruit == ""||this.data.meat == ""||this.data.exercise == ""||this.data.sun == "") 
      {
        wx.showToast({
          title: '填空不能为空',
          image:"../../images/no.png",
          mask: true,
          duration: 1000
        })
        return false
      }
      var score = 0 , probability = '0' , level = 0;

        this.data.age=parseInt(this.data.age);
        this.data.height=parseFloat(this.data.height);
        this.data.weight=parseFloat(this.data.weight);
        this.data.bmi=(this.data.weight/this.data.height)/this.data.height;
        this.data.work=parseInt(this.data.work);
        this.data.fruit=parseFloat(this.data.fruit);
        this.data.meat=parseFloat(this.data.meat);
        this.data.exercise=parseInt(this.data.exercise);
        this.data.sun=parseFloat(this.data.sun);

        if(this.data.age>=60)
          score++;
        if(this.data.bmi>=18.5)
          score--;
        if(this.data.work<=2)
          score--;
        if(this.data.fruit>=0.5&&this.data.fruit<=3.0)
          score--;
        if(this.data.meat>=3)
          score--;
        if(this.data.exercise>=3)
          score--;
        if(this.data.sun>=1)
          score--;
        
        if(score===-7)
          probability ='0.07';
        else if(score===-6)
          probability ='0.40';
        else if(score===-5)
          probability ='2.04';
        else if(score===-4)
          probability ='10.00';
        else if(score===-3)
          probability ='20.39';
        else if(score===-2)
          probability ='37.15';
        else if(score===-1)
          probability ='75.80';
        else if(score===0)
          probability ='94.40';
        else 
          probability ='98.90';
        if(score<=-4)
          level = 0;
        else if(score<=-3)
          level = 1;
        else
          level = 2;
      wx.showModal({
        title: '风险计算',
        content: '您患有骨骼疏松的概率为'+probability
        +'%'+'风险评级为'+this.data.levelArray[level].Name,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      }
      )
   }
  
    if (this.data.currentTab == 1)
    {
      var StartNum = 3500;
      if (this.data.age == ""||this.data.height == ""||this.data.weight == ""||this.data.fruit == ""||this.data.meat == ""||this.data.exercise == ""||this.data.sun == ""||this.data.menopause == ""||this.data.tea == "") {
        wx.showToast({
          title: '填空不能为空',
          image:"../../images/no.png",
          mask: true,
          duration: 1000
        })
        return false
      }
      
      var score = 0 , probability = '0' , level = 0;
        this.data.age=parseInt(this.data.age);
        this.data.height=parseFloat(this.data.height);
        this.data.weight=parseFloat(this.data.weight);
        this.data.bmi=(this.data.weight/this.data.height)/this.data.height;
        this.data.menopause=parseInt(this.data.menopause);
        this.data.fruit=parseFloat(this.data.fruit);
        this.data.meat=parseFloat(this.data.meat);
        this.data.tea=parseInt(this.data.tea);
        this.data.exercise=parseInt(this.data.exercise);
        this.data.sun=parseFloat(this.data.sun);
        this.data.hypertension=parseInt(this.data.hypertension);
   
        if(this.data.age>=70)
          score+=20;
        else if(this.data.age>=60)
          score+=16;
        else if(this.data.age>=50)
          score+=22;
        if(this.data.bmi>=24)
          score--;
        if(this.data.menopause>=30)
          score+=12;
        else if(this.data.menopause>=16)
          score+=4;
        else if(this.data.menopause>=5)
          score+=1;
        if(this.data.fruit>=3)
          score+=5;
        else if(this.data.fruit>=0.5&&this.data.fruit<=1.5)
          score-=10;
        if(this.data.meat>=2)
          score-=6;
        else if(this.data.meat>=1)
          score-=7;
        if(this.data.tea>=1000)
          score+=10;
        else if(this.data.tea>=500)
          score+=7;
        else 
          score-=7;
        if(this.data.sweat===2)
          score-=5;
        else if(this.data.sweat===3)
          score-=6;
        if(this.data.exercise>=3)
          score-=12;
        else(this.data.exercise>=1)
          score-=8;
        if(this.data.sun>=2)
          score-=9;
        else(this.data.sun>=1)
          score-=6;
        if(this.data.hypertension===1)
          score+=5;
        
        if(score<=-40)
          probability ='0.42-1.40';
        else if(score<=-30)
          probability ='1.40-4.10';
        else if(score<=-20)
          probability ='4.10-10.90';
        else if(score<=-8)
          probability ='10.90-30.15';
        else if(score<=-0)
          probability ='30.15-50.00';
        else if(score<=10)
          probability ='50.00-74.00';
        else if(score<=20)
          probability ='74.00-89.90';
        else if(score<=30)
          probability ='89.90-95.89';
        else if(score<=40)
          probability ='95.89-98.52';
        else if(score<=47)
          probability ='98.52-99.28';
        if(score<=-20)
          level = 0;
        else if(score<=-8)
          level = 1;
        else
          level = 3;
        
      wx.showModal({
        title: '风险计算',
        content: '您患有骨骼疏松的概率为'+probability
        +'%'+'风险评级为'+this.data.levelArray[level].Name,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })

    } 
  }
})
