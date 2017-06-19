Page({
  data:{
    // text:"这是一个页面"
    datas:
    {
      code:0,
      ret:null
    },
    loginsession:"",
    list: [
     {
        id: 'form',
        name: '我的设置',
        open: false,
        pages: [
          {
            page:'readsetting',
            name:'阅读设置'
          },
          {
            page: 'othersetting',
            name: '其他设置'
          },
        ],
     
     }
    ],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
     wx.setNavigationBarTitle({
            title: '我的书架'
    })
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
    //重新请求是因为可能发生了变化
    var that = this;
    wx.request({
      url: "https://fsnsaber.cn/GetUserBookShelfNovelsJson",
      data: {
        session: that.data.loginsession
      },
      success: function (res) {
        console.log("bookshelf ====> res=", res);
        that.setData({ datas: res.data });
        var dat = that.data.datas;
        var readurl = dat.ret[event.target.id].usernovel.readchapterurl
        var newRegExp = new RegExp("/", 'gm');
        var v1 = readurl.replace(newRegExp, "-")
        var v2 = v1.replace(".", "+");
        console.log("content url = ", v2)
        wx.navigateTo({ url: "../content/content?data=" + v2 });
      },
      fail: function (err) {
        console.log("bookshelf https请求失败了:", err);
      }
    });
    
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

})