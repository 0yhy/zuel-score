const app = getApp();

const initialData = {
  advice: undefined,
  url: app.globalData.url,
  token: wx.getStorageSync("token")
};

Page({
  data: initialData,
  inputAdvice: function (e) {
    this.setData({ advice: e.detail.value });
  },
  submitAdvice: function () {
    console.log("submit");
    wx.request({
      url: `${this.data.url}/users/advice`,
      data: {
        advice: this.data.advice
      },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      method: "POST",
      success: (res) => {
        console.log(res);
        wx.showToast({
          title: "感谢您的意见-3-",
          icon: "none",
          duration: 1500,
          mask: false,
          success: () => {
            wx.navigateBack({
              delta: 1
            });
          }
        });
      }
    });
  }
});