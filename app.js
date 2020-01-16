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
  checkLoginStatus: function () {
    let token = wx.getStorageSync("token");;
    if (token) {
      wx.checkSession({
        fail: () => {
          // this.login();
        }
      });
    }
    else {
      // this.login();
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
              console.log(res);
              wx.setStorageSync({
                key: "token",
                data: res.data.data.token
              });
            }
          });
        }
      },
      fail: () => { },
      complete: () => { }
    });
  }
})