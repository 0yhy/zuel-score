const app = getApp();

const scoreArray = [];

for (let i = 0; i <= 1; ++i) {
  scoreArray.push(new Array());
  for (let j = 0; j <= 9; ++j) {
    scoreArray[i].push(j);
  }
}

const initialData = {
  url: app.globalData.url,
  scoreArray: scoreArray,
  score: {
    "first": 0,
    "second": 0
  },
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
    let newScore = {
      "first": e.detail.value[0],
      "second": e.detail.value[1]
    }
    this.setData({ score: newScore });
  }
});