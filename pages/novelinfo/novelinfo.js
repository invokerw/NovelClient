Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    isInbookShelf:0,
    loginsession:"",
    comments:
    {
      code:0,
      ret:null
    },
    commentStr:"",
    loadingComment: false,
    loadingadd: false,
    loadingremove: false,
    loadingdelcomment:false,
    loadingzan:false,
    loadingcancelzan:false,
    zanorcancel:[],
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
              that.setData({comments:res.data});
              console.log("res.data .length= ",res.data.ret.length);
              var zan = [];
              for(var i = 0;i < res.data.ret.length;i++)
              {
                  zan[i] = false;
              }
              that.setData({zanorcancel:zan});
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
               //var that = this;
        wx.request({
        url:"https://fsnsaber.cn/GetANovelCommentsJson",
        data: {
            session:that.data.loginsession,
            novelid:that.data.datas.ret.id
        },
        success:function(res){
          console.log("GetANovelCommentsJson ==== res=",res);
           that.setData({comments:res.data});
           var zan = that.data.zanorcancel;
            //console.log("zan.length",res.data.ret.length);
            //console.log("zan",zan);
           zan[res.data.ret.length-1] =false;
           
           that.setData({zanorcancel:zan});
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
  zanComment:function(event){
    var that = this;
     that.setData({loading: !this.data.loadingzan})
     var dat = that.data.comments; 
     var id = dat.ret[event.target.id].comment.commentid;
      wx.request({
        url:"https://fsnsaber.cn/UpdateANovelCommentJson",
        data:{
          session:that.data.loginsession,
          commentid:id,
          type:'add'
          },
        success:function(res){
           console.log("zanComment request ==== res=",res);
           that.setData({loading: !that.data.loadingzan})
           var cmt = that.data.comments;
           //console.log("zan1 = ", cmt.ret[event.target.id].comment.zan);
           var zannum = parseInt(cmt.ret[event.target.id].comment.zan) + 1;
           //console.log("zannum = ", zannum);
           cmt.ret[event.target.id].comment.zan = zannum.toString();
           //console.log("zan2 = ", cmt.ret[event.target.id].comment.zan);
           that.setData({comments:  cmt});  
           var zan = that.data.zanorcancel
           zan[event.target.id] = true;
           that.setData({zanorcancel: zan}) ;  
        },
        fail: function(err){  
        console.log("zanComment https请求失败了:",err);  
      } 
    });
  },
  cacelZanComment:function(event){
     this.setData({loading: !this.data.loadingcancelzan}) 
     var dat = this.data.comments; 
     var that = this;
     var id = dat.ret[event.target.id].comment.commentid;
     wx.request({
        url:"https://fsnsaber.cn/UpdateANovelCommentJson",
        data:{
          session:that.data.loginsession,
          commentid:id,
          type:'min'
          },
        success:function(res){
           console.log("cacelZanComment request ==== res=",res);
           that.setData({loading: !that.data.loadingcancelzan});
           var cmt = that.data.comments;
           //console.log("zan1 = ", cmt.ret[event.target.id].comment.zan);
           var zannum = parseInt(cmt.ret[event.target.id].comment.zan) - 1;
           //console.log("zannum = ", zannum);
           cmt.ret[event.target.id].comment.zan = zannum.toString();
           //console.log("zan2 = ", cmt.ret[event.target.id].comment.zan);
           that.setData({comments:  cmt});  
           var zan = that.data.zanorcancel;
           zan[event.target.id] = false;
           that.setData({zanorcancel: zan}) ;   
        },
        fail: function(err){  
        console.log("cacelZanComment https请求失败了:",err);  
      } 
    });
  },
  deleteComment:function(event){
    var that = this;
    this.setData({loading: !this.data.loadingdelcomment}) 
    var dat = this.data.comments; 
    var id = dat.ret[event.target.id].comment.commentid;
    wx.request({
        url:"https://fsnsaber.cn/DeleteANovelCommentJson",
        data:{
          session:that.data.loginsession,
          commentid:id,
          },
        success:function(res){
           console.log("deleteComment request ==== res=",res);
           that.setData({loading: !that.data.loadingdelcomment})
           var cmt = that.data.comments;
           cmt.ret.splice(event.target.id, 1);
 
          var zan = that.data.zanorcancel;
           zan.splice(event.target.id, 1);
           that.setData({zanorcancel:  zan}); 
           if(cmt.ret.length == 0)
           {
             cmt.code = 0;
           }
           that.setData({comments:  cmt});  
           console.log("comment = ", that.data.comment);
            console.log("zan = ", that.data.zanorcancel);
        },
        fail: function(err){  
        console.log("deleteComment https请求失败了:",err);  
      } 
    });
  },

})