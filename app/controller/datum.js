'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class DatumController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }

  async datum() {
    const {
        app,
        ctx
      } = this;
      let policyList = await this.ctx.service.api.curlPost("v1/dc/getPolicyList", {
        language_id:1,
        page_index:1,
        page_size:1000
      })
      await ctx.render('datum/datum',{
        policyList:policyList.data
      })
  }

  async datumText() {
    const {
      app,
      ctx
    } = this;
    let getDCType1 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 1
    })
    let getDCType2 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 2
    })
    let getDCType3 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 3
    })
    let allList = await this.ctx.service.api.curlPost("v1/dc/getWordList", {
      type:parseInt(this.ctx.query.id),
      page_index:1,
      page_size:999
    })

    await ctx.render('datum/datum_text',{
      allList:allList.data.word_list,
      getDCType1:getDCType1.data,
      getDCType2:getDCType2.data,
      getDCType3:getDCType3.data,
      type:1,
      id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : ''
    })
  }
  
  
  async datumTextDetial() {
    const {
      app,
      ctx
    } = this;
    let wordDetail = await this.ctx.service.api.curlPost("v1/dc/getWordDetail", {
      word_id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : 1
    })
    
    await ctx.render('datum/datum_text_detial',{
      wordDetail:wordDetail.data
    })
  }

  async datumPpt() {
    const {
      app,
      ctx
    } = this;
    let getDCType1 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 1
    })
    let getDCType2 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 2
    })
    let getDCType3 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 3
    })
    let allList = await this.ctx.service.api.curlPost("v1/dc/getPptList", {
      type:parseInt(this.ctx.query.id),
      page_index:1,
      page_size:999
    })
    await ctx.render('datum/datum_ppt',{
      allList:allList.data.ppt_list,
      getDCType1:getDCType1.data,
      getDCType2:getDCType2.data,
      getDCType3:getDCType3.data,
      type:2,
      id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : ''
    })
  }

  async datumPptDetial() {
    const {
      app,
      ctx
    } = this;
    let pptDetail = await this.ctx.service.api.curlPost("v1/dc/getPptDetail", {
      ppt_id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : 1
    })
    console.log(pptDetail.data);
    await ctx.render('datum/datum_ppt_detial',{
      pptDetail:pptDetail.data
    })
  }

  async datumVideo() {
    const {
      app,
      ctx
    } = this;
    let getDCType1 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 1
    })
    let getDCType2 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 2
    })
    let getDCType3 = await this.ctx.service.api.curlPost("v1/dc/getDCType", {
      data_type: 3
    })
    let allList = await this.ctx.service.api.curlPost("v1/dc/getVideoList", {
      type:parseInt(this.ctx.query.id),
      page_index:1,
      page_size:999
    })
    console.log(allList.data.video_list);
    
    await ctx.render('datum/datum_video',{
      allList:allList.data.video_list,
      getDCType1:getDCType1.data,
      getDCType2:getDCType2.data,
      getDCType3:getDCType3.data,
      type:3,
      id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : ''
    })
  }

  async datumVideoDetial() {
    const {
      app,
      ctx
    } = this;
    let videoDetail = await this.ctx.service.api.curlPost("v1/dc/getVideoDetail", {
      video_id:parseInt(this.ctx.query.id) ? parseInt(this.ctx.query.id) : 1
    })
    console.log(videoDetail.data);
    
    await ctx.render('datum/datum_video_detial',{
      videoDetail:videoDetail.data
    })
  }

  async datumPollicy() {
    const {
      app,
      ctx
    } = this;
    let policyList = await this.ctx.service.api.curlPost("v1/dc/getPolicyList", {
      language_id:1,
      page_index:1,
      page_size:1000
    })
    await ctx.render('datum/datum_pollicy',{
      policyList:policyList.data
    })
  }

  async datumPollicyDetial() {
    const {
      app,
      ctx
    } = this;
    let policyDetail = await this.ctx.service.api.curlPost("v1/dc/getPolicyDetail", {
      policy_id:+ctx.params.id ? +ctx.params.id : 1
    })
    await ctx.render('datum/datum_pollicy_detial',{
      policyDetail:policyDetail.data
    })
  }
  
}
module.exports = DatumController;