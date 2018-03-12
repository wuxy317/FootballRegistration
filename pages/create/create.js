import api from '../../utils/api'
import util from '../../utils/util'
import wxApi from '../../es6-promise/utils/wxApi'
import wxRequest from '../../es6-promise/utils/wxRequest'
import qiniu from '../../utils/qiniu'
import config from '../../utils/config'

var app = getApp();
Page({
    data: {
        money: '',
        title: '',
        address:'',
        longitude:'',
        latitude:'',
        tel:'',
        content: ''
    },
    onShow: function (option) {
      wx.setNavigationBarTitle({
        title: '创建报名'
      });
    },
    onLoad: function (option) {
      console.log('query', option.id);
      this.setData({
        imageUrl: option.id,
        theme: option.theme
      });
    },
    //绑定日期
    bindStartDateChange: function (e) {
      this.setData({
        startDate: e.detail.value
      });
    },
     //绑定时间
    bindStartTimeChange: function (e) {
      this.setData({
        startTime: e.detail.value
      });
    },
    //绑定标题
    bindTitle: function (e) {
      this.setData({
        title: e.detail.value
      })
    },
    //绑定电话
    bindTel: function (e) {
      this.setData({
        tel: e.detail.value
      })
    },
    //绑定价格
    bindMoney: function (e) {
      this.setData({
        money: e.detail.value
      })
    },
    //绑定内容
    bindContent: function (e) {
      this.setData({
        content: e.detail.value
      })
    },
    goToBack: function() {
        console.log('------------navigateBack');
        wx.navigateBack({
            delta: 1
        });
    },
    //提交报名
    formSubmit: function (e) {
      //TODO
      if (true) {
        var name = app.globalData.userInfo.nickName;
          var title = this.data.title;
          var startDate = this.data.startDate;
          var startTime = this.data.startTime;
          var address = this.data.address;
          var money = this.data.money;
          var content = this.data.content; 
          var tel = this.data.tel;
          var longitude = this.data.longitude;
          var latitude = this.data.latitude;
          var data = {
            author: 3,
            title: title,
            content: content,
            post_meta:{
              "status" : "报名中",
              "peopleNumber" : "0",
              "startDate": startDate,
              "startTime": startTime,
              "address": address,
              "tel" : tel,
              "money": money,
              "longitude": longitude,
              "latitude": latitude

            },
            status: 'publish',
            categories: 3
          };
          var self = this;
          var url = api.postPosts();
          var postPostsRequest = wxRequest.postRequestAuth(url, data);
          postPostsRequest.then(res => {
            if (res.statusCode == 201 || res.statusCode == 200) {
              wx.showToast({
                title: '活动创建成功',
                content: res,
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '非常抱歉，创建活动失败，请重新登录小程序后进行尝试',
                showCancel: false,
                success: function (res) {
                  return false;
                }
              })
            }
          })
      }
      else {
        wx.showModal({
          title: '提示',
          content: '标题和内容至少都需要5个字符',
          showCancel: false,
          success: function (res) {
            return false;
          }
        })
      }
    },
      //选择位置位置
  chooseLocation: function (e) {
      console.log(e)
      var that = this
      wx.chooseLocation({
        success: function (res) {
          // success
          console.log(res)
          that.setData({
            hasLocation: true,
            longitude: res.longitude,
            latitude: res.latitude,
            address: res.address
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
});