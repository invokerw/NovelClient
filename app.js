//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

     //检查登录是否过期
     // wx.checkSession({
     //     success: function(e){   //登录态未过期
     //         console.log("login未过期");
     //     },
     //     fail: function(){   //登录态过期了
     //         console.log("login过期了");

     //     }
     // });
    wx.login({
      success: function(res) {
        if (res.code) {
           wx.setStorage({
              key: "code",
              data: res.code
           });
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
                      console.log('user login res.data.ret:',res.data.ret);
                      wx.setStorage({
                        key: "loginsession",
                        data: res.data.ret
                      });       
                  },
                  fail:function(res){
                    console.log('login err:',err);
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
    /*var that = this
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
    }*/
  },
  globalData:{
    userInfo:null,
    listUrl:"https://fsnsaber.cn/GetFileList/listchou.jpg"
  }
})