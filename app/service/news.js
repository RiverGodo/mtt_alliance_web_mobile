const Service = require('egg').Service;
class NewsService extends Service {
  // 获取新闻列表
  async GetNewsList(payload = {
    language_id: 1,
    page_index: 1,
    page_size: 10
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let query = ctx.query
    if (ctx.query) {
      if (query.type > 0) {
        payload.type = +query.type
      }

    }
    let res_data = await ctx.service.api.curlPost("v1/news/getList", payload)
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
  // 获取新闻热点
  async GetHotSpot(payload = {
    language_id: 1
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/news/getHotspot", payload)
    //数据异常
    if (res_data.res_code != 1) {
      return res_data;
    }
    return {
      res_code: 1,
      data: res_data.data
    }
  }
  // 获取新闻详情
  async GetNewsDetail(payload = {}) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/news/getDetail", payload)
    //数据异常
    if (res_data.res_code != 1) {
      return res_data;
    }
    return {
      res_code: 1,
      data: res_data.data
    }
  }
}
module.exports = NewsService;