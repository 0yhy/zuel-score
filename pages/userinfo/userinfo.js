const app = getApp();

const initialData = {
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
};

Page({
  data: initialData,
  onLoad: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    wx.request({
      url: `${this.data.url}/users/getuserinfo`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      method: 'GET',
      success: (res) => {
        console.log(res.data.data);
        this.setData({ student_id: res.data.data.student_id, realname: res.data.data.realname });
      }
    });
  },
  goVerify: function () {
    wx.showModal({
      title: "重新认证",
      content: "您是否需要重新绑定学号-w-？",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (res) => {
        if (res.confirm) {
          console.log("confirmed!!!")
          wx.navigateTo({
            url: "../../pages/identity/identity",
          });
        }
      }
    });
  }
});