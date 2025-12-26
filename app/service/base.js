const Service = require('egg').Service;
class BaseService extends Service {
  // 获取视频列表
  async GetSvgCode(payload = {}) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost('v1/alliance/getSvgCode', payload)
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
}
module.exports = BaseService;