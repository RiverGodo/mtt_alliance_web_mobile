'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class AllianceController extends Controller {
  async alliance() {
    const {
      app,
      ctx
    } = this;
    let alliance = {}
    let baseCode = await this.ctx.service.base.GetSvgCode()
    
    
    if (baseCode.res_code === 1) {
      ctx.cookies.set("uid", baseCode.data.id)
      alliance.svg_code = baseCode.data.svg
    }

    let alliance_member_list_result = await this.ctx.service.alliance.GetMemberList()
    let alliance_member_list = [{
        type: 1,
        type_name: "理事长单位",
        member: []
      },
      {
        type: 2,
        type_name: "名誉理事长单位",
        member: []
      },
      {
        type: 3,
        type_name: "副理事长单位",
        member: []
      },
      {
        type: 4,
        type_name: "成员单位",
        member: []
      },
      {
        type: 5,
        type_name: "合作伙伴",
        member: []
      },
      {
        type: 6,
        type_name: "国外成员机构",
        member: []
      }
    ]

    if (alliance_member_list_result.res_code != 1) {

    } else {
      alliance_member_list_result.data.member_list.map(item => {
        alliance_member_list[item.type - 1].member.push(item)
      })
    }

    alliance.alliance_member_list = alliance_member_list
    console.log(alliance.alliance_member_list[0].member);
    await ctx.render('alliance/alliance', {
      alliance,
      type:this.ctx.query.type ? this.ctx.query.type : 0
    })
  }
}
module.exports = AllianceController;