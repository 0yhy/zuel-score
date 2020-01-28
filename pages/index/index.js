let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  currentSort: 1,
  search_word: ""
};

Page({
  data: initialData,
  onShow: function () {
    this.sortCourse();
  },
  clickCourse: function (e) {
    wx.navigateTo({
      url: `../../pages/course/course?teacher=${e.currentTarget.dataset.teacher}&course=${e.currentTarget.dataset.course}`
    });
  },
  getSortedCourseRequest: function (url, cur) {
    wx.request({
      url: this.data.url + url,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (res) => {
        this.setData({ courseList: res.data.data, currentSort: cur });
      }
    });
  },
  sortCourse: function () {
    this.getSortedCourseRequest("/course", 1);
  },
  sortAvgDesc: function () {
    this.getSortedCourseRequest("/course?sort_option=desc_average", 2);
  },
  sortAvgAsc: function () {
    this.getSortedCourseRequest("/course?sort_option=asc_average", 3);
  },
  sortAbove90Desc: function () {
    this.getSortedCourseRequest("/course?sort_option=desc_above90", 4);
  },
  sortAbove90Asc: function () {
    this.getSortedCourseRequest("/course?sort_option=asc_above90", 5);
  },
  goToSearch: function () {
    wx.navigateTo({
      url: "../search/search",
    });
  }
})