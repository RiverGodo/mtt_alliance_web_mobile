'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class NewsController extends Controller {
  async error404() {
    const {
      app,
      ctx
    } = this;
    await ctx.render('error/404-error')
  }
  // 新闻列表
  async newsList() {
    const {
      app,
      ctx
    } = this;
    let newsListResult = await this.ctx.service.news.GetNewsList();

    if (newsListResult.res_code != 1) {
      await this.error404()
      return
    } else {
      newsListResult.data.news_list.map(item => {
        if (item.type === 1) {
          item.type = "媒体新闻"
        }
        if (item.type === 2) {
          item.type = "联盟新闻"
        }
      })

    }
    let newsList = newsListResult.data.news_list
    console.log(newsList);
    
    await ctx.render('news/news_list', {
      newsList
    })
  }
  // 新闻详情
  async newsDetail() {
    const {
      app,
      ctx
    } = this;
    let newsDetailResult = await this.ctx.service.news.GetNewsDetail({
      news_id: +ctx.params.id
    });

    if (newsDetailResult.res_code != 1) {
      await this.error404()
      return
    } else {
      let type = newsDetailResult.data.type
      if (type === 1) {
        newsDetailResult.data.type = "媒体新闻"
      }
      if (type === 2) {
        newsDetailResult.data.type = "联盟新闻"
      }
    }
    let newsDetail = newsDetailResult.data
    console.log(newsDetail)
    await ctx.render('news/news_detail', {
      newsDetail
    })
  }
}
module.exports = NewsController;