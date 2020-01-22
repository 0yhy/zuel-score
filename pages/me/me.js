const app = getApp();

const initialData = {
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  isverified: app.globalData.isverified,
};

Page({
  data: initialData,
  // goLogin: app.login,
  onLoad: function () {
    this.checkVerifyStatus();
  },
  onShow: function () {
    this.getMyScore();
  },
  checkVerifyStatus: function () {
    wx.request({
      url: `${this.data.url}/users/isverified`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (res) => {
        app.globalData.isverified = res.data.data;
      }
    });
  },
  getMyScore: function () {
    wx.request({
      url: `${this.data.url}/users/myscore`,
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
  }
})