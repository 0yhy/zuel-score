const app = getApp();

const initialData = {
  url: app.globalData.url,
  token: wx.getStorageSync("token"),
  delDisplayed: "none",
  notFoundDisplayed: "none",
  searchword: ""
};

Page({
  data: initialData,
  onShow: function () {
    if (!this.data.token) {
      this.setData({ token: wx.getStorageSync("token") });
    }
  },
  setSearchwordData: function (e) {
    this.setData({ search_word: e.detail.value });
    if (e.detail.value.length > 0) {
      this.setData({ delDisplayed: true, searchword: e.detail.value });
    }
    else {
      this.setData({ delDisplayed: "none", searchword: e.detail.value });
    }
  },
  search: function () {
    wx.request({
      url: `${this.data.url}/search?search_word=${this.data.search_word}`,
      header: { 'content-type': 'application/json', "authorization": `Bearer ${this.data.token}` },
      success: (res) => {
        console.log(res.data.data);
        if (!res.data.data.length) {
          this.setData({ courseList: [], notFoundDisplayed: true });
        }
        else {
          this.setData({ courseList: res.data.data, notFoundDisplayed: "none" });
        }
      }
    });
  },
  clearSearchWord: function () {
    this.setData({ searchword: "", delDisplayed: "none" });
  }
});