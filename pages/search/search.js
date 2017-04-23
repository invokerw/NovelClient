Page({
  data:{
    // text:"这是一个页面"
    datas:
    {
      code:0,
      list:null
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
        url:"https://fsnsaber.cn/GetSearchNoteJson?notename="+this.data.searchStr,
        success:function(res){
          console.log("search request ==== res=",res);
           that.setData({datas:res.data});
           that.setData({loading: !that.data.loading})

           if(that.data.datas.code == 0)//就只有一个小说直接跳到list
           {
             console.log("code = 0"); 
             var v1 = that.data.datas.list[0].churl.substring(19);
             //console.log(v1.lastIndexOf("/"));
             var v2 = v1.substring(0,v1.lastIndexOf("/")+1);
             //console.log(v2);
             var newRegExp = new RegExp("/", 'gm'); 
             var v3 = v2.replace(newRegExp,"-")
             console.log(v3)
             wx.navigateTo({url:"../list/list?url="+v3});
           }
           else
           {
              console.log("code = 1"); //搜到好多小说有该名字的小说
              var arr = new Array();
              for(var i=0;i<res.data.list.length;i++)
              {
                    var str = res.data.list[i].url.substring(22);
                    //console.log(str);
                    var var1 = str.substring(0,str.indexOf("/")); 
                    var var2 = str.substring(str.indexOf("/")+1,str.length-1);
                    str = str + var2 + "s.jpg" ;
                    //console.log(str);
                    arr.push(str);
              }
              that.setData({imgs:arr});
              console.log(arr);
           }
        },
        fail: function(err){  
        console.log("search https请求失败了:",err);  
      } 
    });
  },
  clickShowList:function(event){
    var dat = this.data.datas; 
    var url = dat.list[event.target.id].url.substring(16)
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = url.replace(newRegExp,"-")
    console.log(v1)
    wx.navigateTo({url:"../list/list?url="+v1});
  }
})