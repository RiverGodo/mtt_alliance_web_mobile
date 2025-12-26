'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class QaController extends Controller {
  async qa() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('qa/qa')
  }
}
module.exports = QaController;