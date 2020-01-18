let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url,
  token: wx.getStorageSync("token")
};

Page({
  data: initialData,
  onShow: function () {
    // 请求课程列表
    wx.request({
      url: this.data.url + "/course",
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (result) => {
        console.log(result.data.data);
        this.setData({ courseList: result.data.data });
      },
      fail: (err) => {
        console.log("failed");
        console.log(this.data.url + "/course")
      },
    });
  },
  clickCourse: function (e) {
    wx.navigateTo({
      url: `../../pages/course/course?teacher=${e.currentTarget.dataset.teacher}&course=${e.currentTarget.dataset.course}`
    });
  }
})