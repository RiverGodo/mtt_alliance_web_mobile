'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class MeetingController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }
  async meetingDetail() {
    const {
      app,
      ctx
    } = this;
    let meetingDetail = {}
    let meetingDetailResult = await this.ctx.service.meeting.GetMeetingDetail({
      video_id: +ctx.params.id
    });
    if (meetingDetailResult.res_code != 1) {
      await this.error404()
      return
    } else {
      meetingDetail.guest_list = meetingDetailResult.data.guest_list
    }
    let representativeResult = await this.ctx.service.meeting.GetMeetingRepresentative()
    if (meetingDetailResult.res_code != 1) {
      await this.error404()
      return
    } else {
      meetingDetail.representative_list = representativeResult.data.representative_list
      let obj = {}
      meetingDetail.representative_list.map(item => {
        let type = item.address
        if (obj[type]) {
          obj[type].push(item)
        } else {
          obj[type] = []
          obj[type].push(item)
        }
      })
      meetingDetail.representative_list = obj
    }

    // console.log(meetingDetail.guest_list)
    await ctx.render('meeting/meeting_detail', {
      meetingDetail
    })
  }
  async guestDetial() {
    const {
      app,
      ctx
    } = this;
    let env = this.app.config.env
    let params = this.ctx.params
    let guest_id = params.guest_id
    let guestInfo = await this.ctx.service.api.curlPost("v1/guest/getDetail", {
      "guest_id": +guest_id
    })
    // console.log(guestInfo);
    await ctx.render('meeting/meeting_guest', {
      guestInfo:guestInfo.data
    })
  }
}
module.exports = MeetingController;