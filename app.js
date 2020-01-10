App({
  globalData: {

  },
  onLaunch(options) {
    console.log("初始化");
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