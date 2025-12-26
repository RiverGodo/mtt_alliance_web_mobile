'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class CharacteristicController extends Controller {
  async doctor() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('characteristic/doctor')
  }

  async column() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('characteristic/column')
  }
}
module.exports = CharacteristicController;