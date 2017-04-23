//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function(res) {
        if (res.code) {
           wx.getUserInfo({
            success: function (res2) {
              console.log('userInfo:' + res2.userInfo)
              //发起网络请求
              wx.request({
                  url: 'https://fsnsaber.cn/WxOnLogin',
                  data: {
                  code: res.code,
                  info: res2.userInfo
                  },
                  success:function(res){
                      //redirectTo
                      console.log('ok');      
                  }
                })
            }

          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }})
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log('userInfo:' + res.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    listUrl:"https://fsnsaber.cn/GetFileList/listchou.jpg"
  }
})