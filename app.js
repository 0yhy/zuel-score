App({
  globalData: {
    url: "http://127.0.0.1:1027"
  },
  onLaunch(options) {
    console.log("初始化");
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight;
      }
    });
  },
  onShow(options) {
    console.log("后台进入前台");
  },
  onHide() {
    console.log("前台进入后台");
  },
  onError(msg) {
    console.log("Err: ", msg);
  }
})