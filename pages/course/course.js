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
  token: wx.getStorageSync("token"),
  scoreArray: scoreArray,
  score: {
    "first": 0,
    "second": 0
  },
  value: [8, 5],
  like: "../../assets/icon/like_empty.png",
  liked: "../../assets/icon/like.png",
  dislike: "../../assets/icon/dislike_empty.png",
  disliked: "../../assets/icon/dislike.png",
  currentLiked: false,
  currentDisliked: false,
  like_count: 0,
  dislike_count: 0
}

Page({
  data: initialData,
  onLoad: function (option) {
    // 获取课程信息
    wx.request({
      url: `${this.data.url}/course/detail?teacher_name=${option.teacher}&course_name=${option.course}`,
      header: {
        'content-type': 'application/json',
        "authorization": `Bearer ${this.data.token}`
      },
      success: (result) => {
        this.setData({ course: result.data.data });

        // 获取到course后再根据课程id拿到点赞情况
        wx.request({
          url: `${this.data.url}/course/like?course_id=${this.data.course._id}`,
          header: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.data.token}`
          },
          success: (res) => {
            this.setData({
              currentLiked: res.data.data.islike,
              like_count: res.data.data.like_count
            });
          }
        });
        // 根据课程id拿到踩情况
        wx.request({
          url: `${this.data.url}/course/dislike?course_id=${this.data.course._id}`,
          header: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.data.token}`
          },
          success: (res) => {
            this.setData({
              currentDisliked: res.data.data.isdislike,
              dislike_count: res.data.data.dislike_count
            });
          }
        });
        // 根据课程id拿到分数情况
        wx.request({
          url: `${this.data.url}/course/score?course_id=${this.data.course._id}`,
          header: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.data.token}`
          },
          success: (res) => {
            this.setData({
              score: {
                first: res.data.data.score.first,
                second: res.data.data.score.second
              }
            });
          }
        });
      }
    });
  },
  // 滚动选择分数
  changePicker: function (e) {
    let newScore = {
      "first": e.detail.value[0],
      "second": e.detail.value[1]
    };
    this.setData({ score: newScore });
    // 发送打分请求
    wx.request({
      url: `${this.data.url}/score`,
      data: {
        course_id: this.data.course._id,
        newscore_string: String(e.detail.value[0]) + String(e.detail.value[1])
      },
      header: {
        'content-type': 'application/json', "authorization": `Bearer ${this.data.token}`
      },
      method: 'POST',
      success: (res) => {
        // 如果分数修改成功，重新请求课程详情，以修改页面上的平均分内容
        wx.request({
          url: `${this.data.url}/course/detail?teacher_name=${this.data.course.teacher_name}&course_name=${this.data.course.course_name}`,
          header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
          success: (res) => {
            this.setData({ course: res.data.data });
          }
        });
      }
    });
  },

  setLikeData: function (likeordislike, trueorfalse) {
    // 点赞
    if (likeordislike && trueorfalse) {
      this.setData({
        currentLiked: true,
        like_count: this.data.like_count + 1
      });
      wx.request({
        url: `${this.data.url}/course/clicklike?course_id=${this.data.course._id}`,
        header: {
          'content-type': 'application/json',
          "authorization": `Bearer ${this.data.token}`
        }
      });
    }
    // 取消点赞
    else if (likeordislike && !trueorfalse) {
      this.setData({
        currentLiked: false,
        like_count: this.data.like_count - 1
      });
      wx.request({
        url: `${this.data.url}/course/cancellike?course_id=${this.data.course._id}`,
        header: {
          'content-type': 'application/json',
          "authorization": `Bearer ${this.data.token}`
        }
      });
    }
    // 不喜欢
    else if (!likeordislike && trueorfalse) {
      this.setData({
        currentDisliked: true,
        dislike_count: this.data.dislike_count + 1
      });
      wx.request({
        url: `${this.data.url}/course/clickdislike?course_id=${this.data.course._id}`,
        header: {
          'content-type': 'application/json',
          "authorization": `Bearer ${this.data.token}`
        }
      });
    }
    else {
      this.setData({
        currentDisliked: false,
        dislike_count: this.data.dislike_count - 1
      });
      wx.request({
        url: `${this.data.url}/course/canceldislike?course_id=${this.data.course._id}`,
        header: {
          'content-type': 'application/json',
          "authorization": `Bearer ${this.data.token}`
        }
      });
    }
  },
  // 点赞
  like: function () {
    const liked = this.data.currentLiked;
    const disliked = this.data.currentDisliked;
    if (!liked) {
      this.setLikeData(true, true);
      if (disliked) {
        this.setLikeData(false, false);
      }
    }
    else {
      this.setLikeData(true, false);
    }
  },
  // 踩
  dislike: function () {
    const liked = this.data.currentLiked;
    const disliked = this.data.currentDisliked;
    if (!disliked) {
      this.setLikeData(false, true);
      if (liked) {
        this.setLikeData(true, false);
      }
    }
    else {
      this.setLikeData(false, false);
    }
  }
});