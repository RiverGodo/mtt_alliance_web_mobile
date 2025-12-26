'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class VideoController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }
  // 视频列表
  async videoList() {
    const {
      app,
      ctx
    } = this;
    let videoListResult = await this.ctx.service.video.GetVideoList();

    if (videoListResult.res_code != 1) {
      await this.error404()
      return
    } else {
      videoListResult.data.video_list.map(item => {
        if (item.language_id === 1) {
          item.language_id = "中文"
        } else if (item.language_id === 2) {
          item.language_id = "英文"
        } else if (item.language_id === 3) {
          item.language_id = "法文"
        }
      })

    }
    let videoList = videoListResult.data.video_list
    console.log(videoList)
    await ctx.render('video/video_list', {
      videoList
    })
  }
  // 视频详情
  async videoDetail() {
    const {
      app,
      ctx
    } = this;
    let videoDetailResult = await this.ctx.service.video.GetVideoDetail({
      video_id: +ctx.params.id
    });
    
    if (videoDetailResult.res_code != 1) {
      await this.error404()
      return
    } else {
      videoDetailResult.data.body = JSON.parse(videoDetailResult.data.body)
      let language_id = videoDetailResult.data.language_id
      if (language_id === 1) {
        videoDetailResult.data.language_id = "中文"
      }
      if (language_id === 2) {
        videoDetailResult.data.language_id = "英文"
      }
      if (language_id === 3) {
        videoDetailResult.data.language_id = "法文"
      }
    }
    let videoDetail = videoDetailResult.data
    console.log(videoDetail.body.schedule);
    
    await ctx.render('video/video_detail', {
      videoDetail
    })
  }
}
module.exports = VideoController;