const app = getApp();

const initialData = {
  username: undefined,
  password: undefined,
  captcha: undefined,
  captchaBase64: "",
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  isdisplayed: "none"
};

Page({
  data: initialData,
  setUsernameData: function (e) {
    console.log(e);
    this.setData({ username: e.detail.value });
  },
  setPasswordData: function (e) {
    this.setData({ password: e.detail.value });
  },
  setCaptchaData: function (e) {
    this.setData({ captcha: e.detail.value });
  },
  verifyIdentity: function () {
    console.log(this.data.username, this.data.password);
    wx.showLoading({
      title: "请耐心等待~",
      mask: true,
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 20000);
    wx.request({
      url: `${this.data.url}/users/verify`,
      data: { username: this.data.username, password: this.data.password },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        wx.hideLoading();
        if (res.data.captchaBase64) {
          this.setData({ captchaBase64: `data:image/png;base64,${res.data.captchaBase64}`, isdisplayed: true });
        }
        else {
          console.log(res.data.data);
          if (!res.data.data.isverified) {
            wx.showToast({
              title: "学号或密码错误！请重新登录",
              duration: 1500,
              mask: false,
              icon: "none",
              success: () => {
                this.setData({ isdisplayed: "none", password: "" });
              }
            });
          }
          else {
            wx.showToast({
              title: "登陆成功！",
              duration: 1500,
              mask: false,
              success: () => {
                this.setData({ isdisplayed: "none" });
                wx.navigateBack({
                  delta: 1
                });
              }
            });
          }
        }
      }
    });
  },
  verifyCaptcha: function () {
    wx.request({
      url: `${this.data.url}/users/verifycaptcha?captcha=${this.data.captcha}`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (res) => {
        console.log(res.data.data);
        if (!res.data.data.isverified) {
          wx.showToast({
            title: "学号或密码错误！请重新登录",
            duration: 1500,
            icon: "none",
            mask: false,
            success: () => {
              this.setData({ isdisplayed: "none", password: "" });
            }
          });
        }
        else {
          wx.showToast({
            title: "登陆成功！",
            duration: 1500,
            mask: false,
            success: () => {
              this.setData({ isdisplayed: "none" });
              wx.navigateBack({
                delta: 1
              });
            }
          });
        }
      },
      fail: () => { },
      complete: () => { }
    });
  }
});