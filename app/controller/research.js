'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class ResearchController extends Controller {
  async research() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('research/research')
  }
}
module.exports = ResearchController;