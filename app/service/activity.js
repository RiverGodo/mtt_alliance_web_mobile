const Service = require('egg').Service;
class ActivityService extends Service {
  // 活动列表
  async GetActivityList(payload = {
    language_id: 1,
    page_index: 1,
    page_size: 10
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/activity/getList", payload)
    // console.log(res_data)
    //数据异常
    if (res_data.res_code != 1) {
      return res_data;
    }
    return {
      res_code: 1,
      data: res_data.data
    }
  }
  // 活动详情
  async GetActivityDetail(payload = {}) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/activity/getDetail", payload)

    //数据异常
    if (res_data.res_code != 1) {
      return res_data;
    }
    console.log(res_data.data)
    return {
      res_code: 1,
      data: res_data.data
    }
  }
    // 直播详情
    async GetSoonList(payload = {}) {
      //解构对象
      const {
        ctx
      } = this;
      let res_data = await ctx.service.api.curlPost("v1/activity/getSoonList", payload)
  
      //数据异常
      if (res_data.res_code != 1) {
        return res_data;
      }
      console.log(res_data.data)
      return {
        res_code: 1,
        data: res_data.data
      }
    }
}
module.exports = ActivityService;