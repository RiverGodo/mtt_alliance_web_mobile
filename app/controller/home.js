'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class HomeController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }
  async home() {
    let result_data = {}
    // 得到新闻列表
    let news_list_result = await this.ctx.service.news.GetNewsList({
      language_id: 1,
      page_index: 1,
      page_size: 999
    });

    if (news_list_result.res_code != 1) {
      result_data.news_list = []
    } else {
      news_list_result.data.news_list.map(item => {
        if (item.type === 1) {
          item.type = "媒体新闻"
        }
        if (item.type === 2) {
          item.type = "联盟新闻"
        }
      })
      result_data.news_list = news_list_result.data.news_list
    }
    // 新闻热点 
    let hot_list_result = await this.ctx.service.news.GetHotSpot({
      language_id: 1
    });
    if (hot_list_result.res_code != 1) {
      result_data.hot_list = []
    } else {
      // console.log(hot_list_result.data.news_list)
      hot_list_result.data.news_list.map(item => {
        if (item.type === 1) {
          item.type = "媒体"
        }
        if (item.type === 2) {
          item.type = "联盟"
        }
      })
      result_data.hot_list = hot_list_result.data.news_list
    }
    // 视频列表 
    let video_list_result = await this.ctx.service.video.GetVideoList({
      language_id: 1,
      page_index: 1,
      page_size: 6
    });
    if (video_list_result.res_code != 1) {
      result_data.video_list = []
    } else {
      video_list_result.data.video_list.map(item => {
        if (item.language_id === 1) {
          item.language_id = "中文"
        }
        if (item.language_id === 2) {
          item.language_id = "英文"
        }
        if (item.language_id === 3) {
          item.language_id = "法文"
        }
      })
      result_data.video_list = video_list_result.data.video_list
    }
    // 通知 / 活动 列表 
    let activity_list_result = await this.ctx.service.activity.GetActivityList({
      page_index: 1,
      page_size: 5,
      language_id: 1
    });
    if (activity_list_result.res_code != 1) {
      result_data.activity_list = []
    } else {
      activity_list_result.data.activity_list.map(item => {
        if (item.type === 1) {
          item.type = "直播预告"
        }
        if (item.type === 2) {
          item.type = "专题讲座"
        }
        if (item.type === 3) {
          item.type = "直播培训"
        }
        if (item.type === 4) {
          item.type = "在线会议"
        }
      })
      result_data.activity_list = activity_list_result.data.activity_list
    }
    // 年会图片
    result_data.meeting_img_list = [{
        src: "http://jhyl-static-file.oss-cn-hangzhou.aliyuncs.com/mtta_web_test/img/meeting/indextab1.png"
      },
      {
        src: "http://jhyl-static-file.oss-cn-hangzhou.aliyuncs.com/mtta_web_test/img/meeting/indextab2.png"
      },
      {
        src: "http://jhyl-static-file.oss-cn-hangzhou.aliyuncs.com/mtta_web_test/img/meeting/indextab3.png"
      }
    ]

    let soon_list = await this.ctx.service.activity.GetSoonList({
      page_index: 1,
      page_size: 999,
      language_id: 1
    });
    console.log(soon_list);
    result_data.soon_list = soon_list.data
    await this.ctx.render('index', {
      result_data
    })
  }
}



module.exports = HomeController;