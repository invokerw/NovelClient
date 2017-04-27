Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    loginsession:"",
    //imgs:"",
    //imgsurl:"http://www.huanyue123.com/files/article/image/"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log("info==== onLoad,id=",options.id);
    var getid = options.id;
    wx.request({
        url:"https://fsnsaber.cn/GetNovelInfoJson",
        data: {
            id:getid
        },
        success:function(res){
          console.log("==== res=",res);
           that.setData({datas:res.data});
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
  clickShowList: function(event){
    //console.log(event);
    var dat = this.data.datas; 
    var url = dat.ret.url.substring(25)
    //console.log("url =",url)
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = url.replace(newRegExp,"-")
    //var id = dat.ret.id
    console.log(v1)
    wx.navigateTo({url:"../list/list?url="+v1});
  },
  addToBookShelf: function(event){
    var dat = this.data.datas; 
    var that = this;
    wx.getStorage({
    key: 'loginsession',
    success: function(res) {
        console.log("loginsession=",res.data);
        that.setData({loginsession:res.data});
        console.log("loginsession=",that.data.loginsession);
        wx.request({
        url:"https://fsnsaber.cn/AddAUserNovelInBookShelfJson",
        data:{
           session:that.data.loginsession,
           novelid:dat.ret.id
        },
        success:function(res){
          console.log("add novel to bookshelf ====> res=",res);
          if(res.code == 1)
          {
            console.log("add novel to bookshelf ok,res.code = ",res.code);
          }
        },
        fail: function(err){  
        console.log("AddAUserNovelInBookShelfJson https请求失败了:",err);  
       } 
    });
    } 
    })
  }
})