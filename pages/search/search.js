Page({
  data:{
    // text:"这是一个页面"
    datas:
    {
      code:0,
      ret:null
    },
    searchStr:"",
    loading: false,
    imgs:"",
    imgsurl:"http://www.huanyue123.com/files/article/image/"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数  
  },
  onReady:function(){
    // 页面渲染完成
     //console.log(this.data.datasList);
  },
  onShow:function(){
    // 页面显示
    //console.log(this.data.datasList);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  inputString:function(e){
    this.setData({searchStr:e.detail.value})
    //console.log("InputString=",this.data.searchStr);
  },
  searchNote:function(e){
    if(this.data.searchStr.length == 0)
    {
      console.log("输入的搜索内容为空");
      return 
    }
     this.setData({loading: !this.data.loading})
     var that = this;
     wx.request({
        url:"https://fsnsaber.cn/GetSearchNovelJson",
        data:{key:this.data.searchStr},
        success:function(res){
           console.log("search request ==== res=",res);
           that.setData({datas:res.data});
           that.setData({loading: !that.data.loading})
           console.log("code = ",that.data.datas.code); 
        },
        fail: function(err){  
        console.log("search https请求失败了:",err);  
      } 
    });
  },
  clickShowList:function(event){
    //console.log(event);
    var dat = this.data.datas; 
    //var url = dat.ret[event.target.id].url.substring(16)
    //var newRegExp = new RegExp("/", 'gm'); 
    //var v1 = url.replace(newRegExp,"-")
    var id = dat.ret[event.target.id].id
    console.log(id)
    wx.navigateTo({url:"../novelinfo/novelinfo?id="+id});
  }
})