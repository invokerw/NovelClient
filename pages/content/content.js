Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    content : "",
    scrollTop:0,
    loginsession:"",


  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("content==== onLoad,url=",options.data);
    var newRegExp = new RegExp("-", 'gm'); 
    var v1 = options.data.replace(newRegExp,"/")
    var v2 = v1.replace("+",".")
    console.log("v2 = "+v2)
    var that = this;
    wx.getStorage({
      key: 'loginsession',
      success: function(res) {
        //console.log("loginsession=",res.data);
        that.setData({loginsession:res.data});
        console.log("loginsession=",that.data.loginsession);
        wx.request({
            url:"https://fsnsaber.cn/GetNovelContentJson?",
            data:{
              go:v2,
              session:that.data.loginsession
            },
            success:function(res){
              console.log("==== res=",res);
                that.setData({content:res.data.content});
                that.setData({datas:res.data});
            },
            fail:function(err){
              console.log("content https err = ",err);
            }
        });
      },
      fail: function(err){  
        console.log("getStorage fail:",err); 
        wx.request({
            url:"https://fsnsaber.cn/GetNovelContentJson?",
            data:{
              go:v2,
              session:that.data.loginsession
            },
            success:function(res){
              console.log("==== res=",res);
                that.setData({content:res.data.content});
                that.setData({datas:res.data});
            },
            fail:function(err){
              console.log("content https err = ",err);
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
   // var content = this.data.content;
   // console.log("content==== onReady data =",content);
   this.onLoad()
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onReachBottom:function(){
  //页面上拉触底事件的处理函数
    //this.setData({content:"加载中....."})
    //this.clickNextChp();

  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    //this.clickPreChp();
  },
  clickPreChp:function(){
    var that = this;
    var v1 = that.data.datas.preurl.substring(19)
    if(v1[0] != '/')
    {
      return;
    }
    console.log("content==== v1 =",v1);
    wx.request({
        url:"https://fsnsaber.cn/GetNovelContentJson",
        data:{
          go:v1,
          session:that.data.loginsession
        },
        success:function(res){
          console.log("==== res=",res);
            that.setData({content:res.data.content});
            that.setData({datas:res.data});
        },
        fail:function(err){
          console.log("content https err = ",err);
        }
    });
  },
  clickNextChp:function(){
    var that = this;
    var v1 = that.data.datas.nexturl.substring(19);
    if(v1[0] != '/'|| v1[v1.length - 1] == '/')
    {
      return;
    }
    console.log("content==== v1 =",v1);
    wx.request({
        url:"https://fsnsaber.cn/GetNovelContentJson",
        data:{
          go:v1,
          session:that.data.loginsession
        },
        success:function(res){
          console.log("==== res=",res);
            that.setData({content:res.data.content});
            that.setData({datas:res.data});
        },
        fail:function(err){
          console.log("content https err = ",err);
        }
    });
  }
})