Page({
  data:{
    // text:"这是一个页面"
    datas:
    {
      code:0,
      ret:null
    },
    loginsession:"",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getStorage({
    key: 'loginsession',
    success: function(res) {
        console.log("loginsession=",res.data);
        that.setData({loginsession:res.data});
        console.log("loginsession=",that.data.loginsession);
        wx.request({
        url:"https://fsnsaber.cn/GetUserBookShelfNovelsJson",
        data:{
           session:that.data.loginsession
        },
        success:function(res){
          console.log("bookshelf ====> res=",res);
           that.setData({datas:res.data});
        },
        fail: function(err){  
        console.log("bookshelf https请求失败了:",err);  
      } 
    });
    } 
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
  readThisNovel: function(event){
    //console.log(event);
    var dat = this.data.datas; 
    var readurl = dat.ret[event.target.id].usernovel.readchapterurl
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = readurl.replace(newRegExp,"-")   
    var v2 = v1.replace(".","+");
    console.log("content url = ",v2)
    wx.navigateTo({url:"../content/content?data="+v2});
  },

})