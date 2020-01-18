let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url,
  token: wx.getStorageSync("token")
}

Page({
  data: initialData,
  onLoad: function (option) {
    console.log("teacherPage")
    wx.request({
      url: this.data.url + "/teacher",
      header: {
        'content-type': 'application/json',
        "authorization": `Bearer ${this.data.token}`
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        this.setData({ teacherList: result.data.data });
      }
    });
  },
  onShow: function () {
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: "肖鹏" },
      header: {
        'content-type': 'application/json',
        "authorization": `Bearer ${this.data.token}`
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        this.setData({ courseList: result.data.data });
        this.setData({ current: "肖鹏" });
      }
    });
  },
  clickTeacher: function (e) {
    let teacher_name = e.currentTarget.dataset.name;
    this.setData({ current: teacher_name });
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: teacher_name },
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (result) => {
        this.setData({ courseList: result.data.data });
      }
    });
  },
  clickCourse: function (e) {
    wx.navigateTo({
      url: `../../pages/course/course?teacher=${e.currentTarget.dataset.teacher}&course=${e.currentTarget.dataset.course}`
    });
  }
})