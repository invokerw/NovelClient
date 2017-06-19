// pages/othersetting/othersetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    light:0,//0-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '其他设置'
    })
    wx.getScreenBrightness({
      success:function(res){
        console.log("light = ",res.value);
        that.setData({ light: res.value });
      }
    })
  },
  sliderchange:function(e) {
    console.log('sliderindex发生 change 事件，携带值为', e.detail.value);
    wx.setScreenBrightness({
      value: e.detail.value/100,
      success:function(){
        console.log("设置亮度成功.");
      },
      fail:function(){
        console.log("设置亮度失败.");
      }
    })
  },
  ClearS:function(){
    wx.clearStorage()
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