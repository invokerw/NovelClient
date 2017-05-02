Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.setNavigationBarTitle({
            title: '分类'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickShowRenqi:function(){
      wx.navigateTo({url:"../topnovels/topnovels?toptype=renqi"});
  },
  clickShowDianji:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=dianji"});
  },
  clickShowShoucang:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=shoucang"});
  },
  clickShowTuijian:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=tuijian"});
  },
  clickShowXianxia:function(){
      wx.navigateTo({url:"../topnovels/topnovels?toptype=xianxia"});
  },
  clickShowXuanhuan:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=xuanhuan"});
  },
  clickShowDushi:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=dushi"});
  },
  clickShowLishi:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=lishi"});
  },
  clickShowWangyou:function(){
      wx.navigateTo({url:"../topnovels/topnovels?toptype=wangyou"});
  },
  clickShowKehuan:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=kehuan"});
  },
  clickShowLingyi:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=lingyi"});
  },
  clickShowYanqing:function(){
    wx.navigateTo({url:"../topnovels/topnovels?toptype=yanqing"});
  }
})