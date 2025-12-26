const Service = require('egg').Service;
class AllianceService extends Service {
  // 获取视频列表
  async GetMemberList(payload = {
    page_index: 1,
    page_size: 999
  }) {
    //解构对象
    const {
      ctx
    } = this;
    let res_data = await ctx.service.api.curlPost("v1/alliance/getMemberList", payload)
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
module.exports = AllianceService;