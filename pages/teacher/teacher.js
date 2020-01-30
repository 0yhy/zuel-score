let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  curTeacher: app.globalData.curTeacher
}

Page({
  data: initialData,
  onLoad: function () {
    let that = this;
    if (!this.data.token) {
      app.login().then(function (res) {
        that.setData({ token: res });
        that.getTeacherList();
      })
    }
    else {
      this.getTeacherList();
    }
  },
  onShow: function () {
    console.log("token:::", this.data.token);
    let that = this;
    if (!this.data.token) {
      app.login().then(function (res) {
        that.setData({ token: res });
        that.getCurTeacherCourseList();
      })
    }
    else {
      this.getCurTeacherCourseList();
    }
  },
  getTeacherList: function () {
    wx.request({
      url: this.data.url + "/teacher",
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (result) => {
        this.setData({ teacherList: result.data.data });
      }
    });
  },
  getCurTeacherCourseList: function () {
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: app.globalData.curTeacher },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (result) => {
        this.setData({ courseList: result.data.data });
      }
    });
  },
  clickTeacher: function (e) {
    let teacher_name = e.currentTarget.dataset.name;
    this.setData({ curTeacher: teacher_name });
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: teacher_name },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (result) => {
        this.setData({ courseList: result.data.data });
        app.globalData.curTeacher = teacher_name;
      }
    });
  },
  clickCourse: function (e) {
    wx.navigateTo({
      url: `../../pages/course/course?teacher=${e.currentTarget.dataset.teacher}&course=${e.currentTarget.dataset.course}`
    });
  }
})