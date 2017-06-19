Page({
  data:{
    // text:"这是一个页面"
    datas:
    {
      code:0,
      ret:null
    },
    showdel:[],
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
    editIndex: 0,
    delBtnWidth: 60//删除按钮宽度单位（rpx）
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
     wx.setNavigationBarTitle({
            title: '我的书架'
    })

 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this;
    wx.getStorage({
      key: 'loginsession',
      success: function (res) {
        console.log("loginsession=", res.data);
        that.setData({ loginsession: res.data });
        console.log("loginsession=", that.data.loginsession);
        wx.request({
          url: "https://fsnsaber.cn/GetUserBookShelfNovelsJson",
          data: {
            session: that.data.loginsession
          },
          success: function (res) {
            console.log("bookshelf ====> res=", res);
            that.setData({ datas: res.data });
            var len = res.data.ret.length;
            var myright = new Array()
            for (var i = 0; i < len; i++) {
              myright[i] = {
                txtStyle: null
              };

            }
            that.setData({ showdel: myright });
            console.log("myright = ", that.data.showdel);
          },
          fail: function (err) {
            console.log("bookshelf https请求失败了:", err);
          }
        });
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  readThisNovel: function(event){
    //console.log(event);
    //重新请求是因为可能发生了变化(在onShow上加上请求代码上就没事了)
    var that = this;
    /*wx.request({
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
    });*/
    var dat = that.data.datas;
    var readurl = dat.ret[event.target.id].usernovel.readchapterurl
    var newRegExp = new RegExp("/", 'gm');
    var v1 = readurl.replace(newRegExp, "-")
    var v2 = v1.replace(".", "+");
    console.log("content url = ", v2)
    wx.navigateTo({ url: "../content/content?data=" + v2 });
    
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
  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log(e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      // var showdel = this.data.showdel;
      // var len = showdel.length;
      // for(var i = 0;i<len;i++)
      // {
      //   if (showdel[i].txtStyle != null )
      //     return;
      // }
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var data = that.data.showdel;
      //将拼接好的样式设置到当前item中
      data[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        showdel: data
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var data = that.data.showdel;
      data[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        showdel: data
      });
    }
  } ,
  delItem:function(e){
    console.log(e);
    var that = this;
    var index = e.target.id;
    wx.request({
      url: "https://fsnsaber.cn/DeleteAUserNovelInBookShelfJson",
      data: {
        session: that.data.loginsession,
        novelid: that.data.datas.ret[index].novel.id
      },
      success: function (res) {
        console.log("remove novel from bookshelf ====> res=", res);
        if (res.data.code == 1) {
          console.log("remove novel from ok,res.data.code = ", res.data.code);
          var datas = that.data.datas;
          datas.ret.splice(index, 1);
          console.log(datas);
          var del = that.data.showdel;
          del.splice(index, 1);
          that.setData({ showdel: del })
          that.setData({ datas: datas })
        }
      },
      fail: function (err) {
        console.log("DeleteAUserNovelInBookShelfJson https请求失败了:", err);
      }
    });
  }

})