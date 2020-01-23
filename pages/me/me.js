const app = getApp();

const initialData = {
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  isverified: app.globalData.isverified,
};

Page({
  data: initialData,
  // goLogin: app.login,
  onShow: function () {
    this.getMyScore();
    this.checkVerifyStatus();
  },
  checkVerifyStatus: function () {
    this.setData({ isverified: app.globalData.isverified });
  },
  getMyScore: function () {
    wx.request({
      url: `${this.data.url}/users/getscore`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (res) => {
        console.log(res.data.data);
        this.setData({ score: res.data.data });
      }
    });
  },
  goToAdvice: function () {
    console.log("advice");
    wx.showLoading({
      title: "Loading",
      mask: true,
      success: () => {
        wx.navigateTo({
          url: "../../pages/advice/advice",
          success: () => {
            console.log('hei')
          },
          fail: (err) => {
            console.log(err)
          }
        });
      }
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 2000);
  },
  goToIdentity: function () {
    if (this.data.isverified) {
      wx.navigateTo({
        url: "../../pages/userinfo/userinfo"
      });
    }
    else {
      wx.navigateTo({
        url: "../../pages/identity/identity"
      });
    }
  }
})