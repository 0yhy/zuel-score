App({
  globalData: {
    url: "http://127.0.0.1:1027",
    token: null
  },
  onLaunch() {
    console.log("初始化");
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight;
      }
    });
    this.checkLoginStatus();
  },
  checkLoginStatus: function () {
    let token = wx.getStorageSync("token");;
    if (token) {
      console.log("token:", token);
      wx.checkSession({
        fail: () => {
          this.login();
        }
      });
    }
    else {
      this.login();
      console.log("login!");
    }
  },
  login: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: this.globalData.url + "/users/checkuser",
            data: { code: res.code },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
              wx.setStorageSync("token", res.data.data);
            }
          });
        }
      }
    });
  }
})