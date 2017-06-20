// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qlist:[
      "书籍问题", //qtype: 0,
      "操作问题", //qtype: 1,
      "其他问题", //qtype: 2,
    ],
    listIndex: 0,
    evaContent:'',
    mailContent:'',
    maxLength:300,
    nowLength:0,
    loginsession:'',
  },
  bindCountryChange: function (e) {
    console.log('picker 发生选择改变，携带值为', e.detail.value);

    this.setData({
      listIndex: e.detail.value
    })
  },
  bindinput:function(e){
    //console.log(e);
    this.setData({
      nowLength: e.detail.value.length
    });
    var len = this.data.maxLength;
    this.setData({
      evaContent: e.detail.value
    });

  },
  mailinput: function (e){
    //console.log(e);
    this.setData({
      mailContent: e.detail.value
    });
  },
  formSubmit: function () {
    var that = this;
    var content = that.data.evaContent;
    //console.log(content);
    if(content.length < 1){
      console.log("问题描述不能为空")
      wx.showModal({
        title: '错误',
        content: '问题描述不能为空',
        showCancel:false,
      })
      return 
    }
    if (that.data.loginsession.length == 0){
      console.log("获取登录态失败请重新登录")
      wx.showModal({
        title: '错误',
        content: '获取登录态失败请重新登录',
        showCancel: false,
      })
      return 
    }
    //console.log("loginsession=", that.data.loginsession);
    wx.request({
      url: "https://fsnsaber.cn/AddUserFeedbackJson",
      data: {
        session: that.data.loginsession,
        qtype: that.data.listIndex,
        content: that.data.evaContent,
        mail: that.data.mailContent,
      },
      success: function (res) {
        console.log("feedback ====> res=", res);
        if(res.data.code == 1){
          wx.showToast({
            title: '感谢您的反馈，我们会尽快处理',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            evaContent:''
          });
        }else{
          wx.showModal({
            title: '失败',
            content: '未知问题，请重试',
            showCancel: false,
          })
        }


      },
      fail: function (err) {
        console.log("feedback https请求失败:", err);
        wx.showModal({
          title: '请求失败',
          content: '网络问题，请重试',
          showCancel: false,
        })
      }
    });
   
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: "问题反馈"
    })
    wx.getStorage({
      key: 'loginsession',
      success: function (res) {
        console.log("loginsession=", res.data);
        that.setData({ loginsession: res.data });
      }
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