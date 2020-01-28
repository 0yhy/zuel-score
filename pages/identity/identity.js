const app = getApp();

const initialData = {
  username: undefined,
  password: undefined,
  realname: undefined,
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
};

Page({
  data: initialData,
  setUsernameData: function (e) {
    this.setData({ username: e.detail.value });
  },
  setPasswordData: function (e) {
    this.setData({ password: e.detail.value });
  },
  setCaptchaData: function (e) {
    this.setData({ captcha: e.detail.value });
  },
  verifyIdentity: function () {
    wx.showLoading({
      title: "请耐心等待~",
      mask: true,
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 20000);
    console.log(this.data.username, this.data.password);
    wx.request({
      url: `${this.data.url}/users/verify`,
      data: { username: this.data.username, password: this.data.password },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      method: 'POST',
      success: (res) => {
        wx.hideLoading();
        // 如果身份验证信息错误
        if (!res.data.data.isverified) {
          wx.showToast({
            title: "学号或密码错误！请重新登录",
            duration: 1500,
            mask: false,
            icon: "none",
            success: () => {
              this.setData({ password: "" });
            }
          });
        }
        // 如果身份认证信息正确
        else {
          // 更改身份验证信息
          console.log(res.data.data);
          wx.request({
            url: `${this.data.url}/users/changeverify`,
            data: { student_id: this.data.username, realname: res.data.data.realname },
            header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
            method: 'POST',
            success: (res) => {
              console.log(res);
              this.setData({ realname: res.data.data.realname });
              app.globalData.isverified = true;
              console.log(app.globalData);
            }
          });
          wx.showToast({
            title: "登陆成功！",
            duration: 1500,
            mask: false,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 2000);
            }
          });
        }
      }
    });
  }
});