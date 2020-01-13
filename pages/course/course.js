const app = getApp();

const score = [];

for (let i = 0; i <= 9; ++i) {
  score.push(i)
}

const initialData = {
  url: app.globalData.url,
  score: score,
  score0: 0,
  score1: 0,
  value: [8, 5]
}

Page({
  data: initialData,
  onLoad: function (option) {
    wx.request({
      url: this.data.url + `/course/detail?teacher_name=${option.teacher}&course_name=${option.course}`,
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        this.setData({ course: result.data.data });
      }
    });
  },
  changePicker: function (e) {
    this.setData({ score0: e.detail.value[0], score1: e.detail.value[1] });
  }
})