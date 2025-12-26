'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class AboutController extends Controller {
  async about() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('about/about')
  }
}
module.exports = AboutController;