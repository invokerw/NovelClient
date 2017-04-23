Page({
  data:{
    // text:"这是一个页面"
    datas:"",
    imgs:"",
    imgsurl:"http://www.huanyue123.com/files/article/image/"
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
    var url = dat.list[event.target.id].url.substring(16)
    var newRegExp = new RegExp("/", 'gm'); 
    var v1 = url.replace(newRegExp,"-")
    console.log(v1)
    wx.navigateTo({url:"../list/list?url="+v1});
  },

})