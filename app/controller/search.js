'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class SearchController extends Controller {
  async search() {
    const {
      app,
      ctx
    } = this;

    await ctx.render('search/search')
  }
  async searchDetial() {
    const {
      app,
      ctx
    } = this;
    let searchList = await this.ctx.service.api.curlPost("v1/base/search", {
      str:this.ctx.query.text,
      type:parseInt(this.ctx.query.type) ? parseInt(this.ctx.query.type) : 0,
      language_id:1,
      page_index:1,
      page_size:999
    })
    console.log(searchList.data.list);
    await ctx.render('search/search_detial',{
      text:this.ctx.query.text,
      type:this.ctx.query.type ? this.ctx.query.type : 0,
      searchList:searchList.data.list
    })
  }
}
module.exports = SearchController;