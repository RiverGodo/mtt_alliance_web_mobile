'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class TalentController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }

  // 人才培养
  async talentDetail() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent')
  }

  //国内培训列表
  async talentInland() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent_inland')
  }
  //国外培训列表
  async talentForeign() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent_foreign')
  }
  //项目回顾列表
  async talentBack() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent_back')
  }
  //国内培训详情
  async talentInlandDetial() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent_inland_detial',{
      id:+ctx.params.id ? +ctx.params.id : 1
    }) 
  }
  //国际培训详情
  async talentForeignDetial() {
    const {
      app,
      ctx
    } = this;
    let router_params = this.ctx.params
    let env = this.app.config.env
    let mock_data = this.app.mock.talentData
    if(router_params.country && mock_data[router_params.country]){
      let data = mock_data[router_params.country]
      await this.ctx.render('talent/talent_foreign_detial', {
        env,
        data
      }) //国际项目详情(配图)
    }else{
      console.log(this.ctx.params);
      
      // await this.ctx.render('error/404-error', {
      //   env
      // })
    }
  }
  //国际培训详情单页
  async talentDevDetailSimple() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talentDevDetailSimple') 
  }
  //项目回顾详情
  async talentBackDetial() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('talent/talent_back_detial',{
      id:+ctx.params.id ? +ctx.params.id : 1
    }) 
  }
  
}
module.exports = TalentController;