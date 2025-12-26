'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName

class ActivityController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }
  // 通知列表
  async activityList() {
    const {
      app,
      ctx
    } = this;
    let activityListResult = await this.ctx.service.activity.GetActivityList({
      language_id: 1,
      page_index: 1,
      page_size: 999
    });

    if (activityListResult.res_code != 1) {
      await this.error404()
      return
    } else {

      activityListResult.data.activity_list.map(item => {
        if (item.type === 1) {
          item.type = "直播预告"
        } else if (item.type === 2) {
          item.type = "专题讲座"
        } else if (item.type === 3) {
          item.type = "直播培训"
        } else if (item.type === 4) {
          item.type = "在线会议"
        }
      })
    }
    let activityList = activityListResult.data.activity_list
    // console.log(activityList)
    await ctx.render('notice/notice_list', {
      activityList
    })
  }
  // 通知详情
  async activityDetail() {
    const {
      app,
      ctx
    } = this;
    let activityDetailResult = await this.ctx.service.activity.GetActivityDetail({
      activity_id: +ctx.params.id
    });
    if (activityDetailResult.res_code != 1) {
      await this.error404()
      return
    } else {
      let type = activityDetailResult.data.type
      if (type === 1) {
        activityDetailResult.data.type = "直播预告"
      }
      if (type === 2) {
        activityDetailResult.data.type = "专题讲座"
      }
      if (type === 3) {
        activityDetailResult.data.type = "直播培训"
      }
      if (type === 4) {
        activityDetailResult.data.type = "在线会议"
      }
    }
    let activityDetail = activityDetailResult.data
    activityDetailResult.data.body_json = JSON.parse(activityDetailResult.data.body_json)
    console.log(activityDetail.body_json.background.end_live_time,"wsq");
    
    await ctx.render('notice/notice_detail', {
      activityDetail
    })
  }
}
module.exports = ActivityController;