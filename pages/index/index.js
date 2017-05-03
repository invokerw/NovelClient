Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    topten:"",
    //imgs:"",
    //imgsurl:"http://www.huanyue123.com/files/article/image/"
    imgUrls:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
        url:"https://fsnsaber.cn/GetTopNovelListJson",
        success:function(res){
          console.log("==== res=",res);
           that.setData({datas:res.data});
           var arr = new Array();
           var len = 10;
           if(res.data.ret.length < len)
           {
             len = res.data.ret.length ;
           }
           for(var i=0;i<len;i++)
           {
                arr[i] = res.data.ret[i]
           }
           that.setData({topten:arr});
           console.log(arr);
        },
        fail: function(err){  
        console.log("index https请求失败了:",err);  
      } 
    });
   wx.request({
        url:"https://fsnsaber.cn/GetIndexImgsJson",
        success:function(res){
          //console.log("==== res=",res);
           that.setData({imgUrls:res.data.ret});
        },
        fail: function(err){  
        console.log("index https请求失败了:",err);  
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
  clickShowInfo: function(event){
    //console.log(event);
    var dat = this.data.datas; 
    //var url = dat.ret[event.target.id].url.substring(16)
    //var newRegExp = new RegExp("/", 'gm'); 
    //var v1 = url.replace(newRegExp,"-")
    var id = dat.ret[event.target.id].id
    console.log(id)
    wx.navigateTo({url:"../novelinfo/novelinfo?id="+id});
  },
  clickImgShowinfo:function(event){
    //console.log(event);
    var dat = this.data.imgUrls; 
    //var url = dat.ret[event.target.id].url.substring(16)
    //var newRegExp = new RegExp("/", 'gm'); 
    //var v1 = url.replace(newRegExp,"-")
    var id = dat[event.target.id].id
    console.log(id)
    wx.navigateTo({url:"../novelinfo/novelinfo?id="+id});
  },


})