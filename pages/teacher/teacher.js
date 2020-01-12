let app = getApp();

const initialData = {
  statusBarHeight: app.globalData.statusBarHeight,
  url: app.globalData.url
}

Page({
  data: initialData,
  onLoad: function (option) {
    console.log("teacherPage")
    wx.request({
      url: this.data.url + "/teacher",
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        this.setData({ teacherList: result.data.data });
      }
    });
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: "肖鹏" },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        this.setData({ courseList: result.data.data });
      },
      fail: () => { },
      complete: () => { }
    });
  },
  clickTeacher: function (e) {
    let teacher_name = e.currentTarget.dataset.name;
    wx.request({
      url: this.data.url + "/teacher/course",
      data: { teacher_name: teacher_name },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        this.setData({ courseList: result.data.data });
      },
      fail: () => { },
      complete: () => { }
    });
  }
})