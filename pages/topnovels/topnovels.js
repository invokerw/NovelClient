// pages/topnovels/topnovels.js
Page({
  data:{
    datas:"",
    noveltype:"",
    showType:"",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log("topnovels==== onLoad,toptype=",options.toptype);
    var toptype = options.toptype;
    var requrl = "https://fsnsaber.cn/GetTopNovelListJson";
    if(toptype == "renqi")
    { 
      that.setData({noveltype:"default"});
      that.setData({showType:"人气榜单"});
    }
    else if(toptype == "dianji")
    {
      that.setData({noveltype:"default"});
      that.setData({showType:"点击榜单"});
     }
    else if(toptype == "shoucang")
    {
      that.setData({noveltype:"goodnum"});
      that.setData({showType:"收藏榜单"});
    }
    else if(toptype == "tuijian")
    {
      that.setData({noveltype:"allvote"});
      that.setData({showType:"推荐榜单"});

    }
    else if(toptype == "kehuan")
    {
      that.setData({noveltype:"kehuan"});
      that.setData({showType:"科幻小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "xianxia")
    {
      that.setData({noveltype:"xianxia"});
      that.setData({showType:"仙侠小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "xuanhuan")
    {
      that.setData({noveltype:"xuanhuan"});
      that.setData({showType:"玄幻小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "dushi")
    {
      that.setData({noveltype:"dushi"});
      that.setData({showType:"都市小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "lishi")
    {
      that.setData({noveltype:"lishi"});
      that.setData({showType:"历史小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "wangyou")
    {
      that.setData({noveltype:"wangyou"});
      that.setData({showType:"网游小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    else if(toptype == "lingyi")
    {
      that.setData({noveltype:"lingyi"});
      that.setData({showType:"灵异小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
     else if(toptype == "yanqing")
    {
      that.setData({noveltype:"yanqing"});
      that.setData({showType:"言情小说"});
      requrl = "https://fsnsaber.cn/GetATypeNovelJson";
    }
    wx.request({
        url:requrl,
        data: {
            noveltype:that.data.noveltype
        },
        success:function(res){
          console.log("==== res=",requrl,res);
           that.setData({datas:res.data});
        },
        fail: function(err){  
        console.log("https请求失败了:",err);  
      } 
    });
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
  clickShowList: function(event){
    //console.log(event);
    var dat = this.data.datas; 
    //var url = dat.ret[event.target.id].url.substring(16)
    //var newRegExp = new RegExp("/", 'gm'); 
    //var v1 = url.replace(newRegExp,"-")
    var id = dat.ret[event.target.id].id
    console.log(id)
    wx.navigateTo({url:"../novelinfo/novelinfo?id="+id});
  },
})