// pages/fontsetting/fontsetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readset: {
      fontsize : null,
      backgroundcolor: null,
    },
    items: [
      { name: '#FFFFFF', value: '白色' },
      { name: '#C4C4C4', value: '灰色' },
      { name: '#899DA2', value: '棕色' },
      { name: '#A9C8AD', value: '绿色', checked: 'true' },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var readset = getApp().globalData.readset;
    var that = this;
    wx.setNavigationBarTitle({
      title: '阅读设置'
    })
    console.log(readset)   
    that.setData({ readset: readset });
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
  
  },
  radioChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value);   
    var that = this;
    var readset = that.data.readset;
    readset.backgroundcolor = e.detail.value;
    that.setData({ readset: readset });
  },
  FontSizeSUB:function(){
    var that = this;
    var readset = that.data.readset;
    if (readset.fontsize == 1){
      wx.showModal({
        title: '提示',
        content: '字体已到最小:1',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定');
          }
        }
      })
      return;
    }
    readset.fontsize = readset.fontsize - 1;
    that.setData({ readset: readset });
  },
  FontSizeADD:function(){
    var that = this;
    var readset = that.data.readset;
    if (readset.fontsize == 50) {
      wx.showModal({
        title: '提示',
        content: '字体已到最大:50',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定');
          }
        }
      })
      return;
    }
    readset.fontsize = readset.fontsize + 1;
    that.setData({ readset: readset });
  },
  SaveSet:function(){
    //保存
    var that = this;
    var readset = that.data.readset;
 
    wx.setStorage({
      key: "readsetbackgroundcolor",
      data: readset.backgroundcolor
    }); 
    wx.setStorage({
      key: "readsetfontsize",
      data: readset.fontsize
    });
    var app = getApp()
    app.globalData.readset = readset;
    wx.showToast({
      title: '成功',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


})