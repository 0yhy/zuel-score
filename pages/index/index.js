let app = getApp();

// let courses = require("../../test/course").json.data;

const initialData = {
  // courseList: courses,
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url
};

Page({
  data: initialData,
  onLoad: function (option) {
    wx.request({
      url: this.data.url + "/course",
      header: { 'content-type': 'application/json' },
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