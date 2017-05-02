Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    isInbookShelf:0,
    loginsession:"",
    comment:
    {
      code:0,
      ret:null
    },
    commentStr:"",
    loadingComment: false,
    loadingadd: false,
    loadingremove: false,
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
           wx.setNavigationBarTitle({
            title: that.data.datas.ret.novelname
          })
        },
        fail: function(err){  
        console.log("index https请求失败了:",err);  
      } 
    });

    wx.getStorage({
    key: 'loginsession',
    success: function(res) {
        //console.log("loginsession=",res.data);
        that.setData({loginsession:res.data});
        console.log("loginsession=",that.data.loginsession);
        wx.request({
        url:"https://fsnsaber.cn/GetTheNovelInBookShelfJson",
        data:{
           session:that.data.loginsession,
           novelid:getid
        },
        success:function(res){
          console.log("GetTheNovelInBookShelfJson ====> res=",res);
          if(res.data.code == 1)
          {
            console.log("bookshelf have this novel");
            that.setData({isInbookShelf:1});
          }
        },
        fail: function(err){  
        console.log("GetTheNovelInBookShelfJson https请求失败了:",err);  
       }   
       });
        //评论请求
      wx.request({
            url:"https://fsnsaber.cn/GetANovelCommentsJson",
            data: {
                session:that.data.loginsession,
                novelid:getid
            },
            success:function(res){
              console.log("GetANovelCommentsJson ==== res=",res);
              that.setData({comment:res.data});
            },
            fail: function(err){  
            console.log("GetANovelCommentsJson https请求失败了:",err);  
            } 
         });


   
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
    var that = this;
    that.setData({loadingadd: !that.data.loadingadd})
    var dat = this.data.datas; 
    //wx.getStorage({
    //key: 'loginsession',
    //success: function(res) {
        //console.log("loginsession=",res.data);
        //that.setData({loginsession:res.data});
        console.log("addToBookShelf loginsession=",that.data.loginsession);
        wx.request({
        url:"https://fsnsaber.cn/AddAUserNovelInBookShelfJson",
        data:{
           session:that.data.loginsession,
           novelid:dat.ret.id
        },
        success:function(res){
          console.log("add novel to bookshelf ====> res=",res);
          if(res.data.code == 1)
          {
            console.log("add novel to bookshelf ok,res.data.code = ",res.data.code);
            that.setData({isInbookShelf:1});
            that.setData({loadingadd: !that.data.loadingadd})
          }
        },
        fail: function(err){  
        console.log("AddAUserNovelInBookShelfJson https请求失败了:",err);  
       } 
    });
    //} 
    //})
  },
  removeToBookShelf: function(event){
    var that = this;
    var dat = this.data.datas; 
    that.setData({loadingremove: !that.data.loadingremove})
    console.log("removeToBookShelf loginsession=",that.data.loginsession);
    wx.request({
      url:"https://fsnsaber.cn/DeleteAUserNovelInBookShelfJson",
      data:{
          session:that.data.loginsession,
          novelid:dat.ret.id
      },
      success:function(res){
        console.log("remove novel from bookshelf ====> res=",res);
        if(res.data.code == 1)
        {
          console.log("remove novel from ok,res.data.code = ",res.data.code);
          that.setData({isInbookShelf:0});
           that.setData({loadingremove: !that.data.loadingremove})
        }
      },
      fail: function(err){  
      console.log("DeleteAUserNovelInBookShelfJson https请求失败了:",err);  
      } 
    });
  },
  inputString:function(e){
      this.setData({commentStr:e.detail.value})
  },
  commentNovel:function(e){
    if(this.data.commentStr.length == 0)
    {
      console.log("输入的搜索内容为空");
      return 
    }
     this.setData({loading: !this.data.loadingComment})
     var that = this;
     wx.request({
        url:"https://fsnsaber.cn/AddANovelCommentJson",
        data:{
          session:that.data.loginsession,
          novelid:that.data.datas.ret.id,
          content:this.data.commentStr
          },
        success:function(res){
           console.log("commentNovel request ==== res=",res);
           that.setData({loading: !that.data.loadingComment})
               var that = this;
        wx.request({
        url:"https://fsnsaber.cn/GetANovelCommentsJson",
        data: {
            session:that.data.loginsession,
            novelid:that.data.datas.ret.id
        },
        success:function(res){
          console.log("GetANovelCommentsJson ==== res=",res);
           that.setData({comment:res.data});
        },
        fail: function(err){  
        console.log("GetANovelCommentsJson https请求失败了:",err);  
        } 
         });
        },
        fail: function(err){  
        console.log("commentNovel https请求失败了:",err);  
      } 
    });
  },


})