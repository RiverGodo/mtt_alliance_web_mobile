const Service = require('egg').Service;
class VideoService extends Service {
  // 获取视频列表
  async GetVideoList(payload = {
    language_id: 1,
    page_index: 1,
    page_size: 10
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/video/getList", payload)
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
  // 获取视频详情
  async GetVideoDetail(payload = {
    language_id: 1,
    page_index: 1,
    page_size: 10
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/video/getDetail", payload)
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
module.exports = VideoService;