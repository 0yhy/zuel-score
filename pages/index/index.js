let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url
};

Page({
  data: initialData,
  onLoad: function () {
    let token = wx.getStorageSync("token");
    wx.request({
      url: this.data.url + "/course",
      header: {
        'content-type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      method: 'GET',
      dataType: 'json',
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