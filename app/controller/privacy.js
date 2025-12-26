'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class PrivacyController extends Controller {
  async privacy() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('privacy/privacy')
  }
}
module.exports = PrivacyController;