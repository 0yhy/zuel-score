App({
  globalData: {
    url: "http://127.0.0.1:1027",
    token: wx.getStorageSync("token"),
    isverified: false,
    curTeacher: "刘萍"
  },
  onLaunch() {
    console.log("初始化");
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight;
      }
    });
    this.checkLoginStatus();
    this.checkVerifyStatus();
  },
  checkLoginStatus: function () {
    if (this.globalData.token) {
      console.log("token:", this.globalData.token);
      wx.checkSession({
        success: () => {
          console.log("session_key valid");
        },
        fail: () => {
          console.log("token expired!");
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
  },
  checkVerifyStatus: function () {
    wx.request({
      url: `${this.globalData.url}/users/isverified`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.globalData.token}` },
      success: (res) => {
        this.globalData.isverified = res.data.data;
      }
    });
  },
});