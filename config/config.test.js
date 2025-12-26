'use strict';
var path = require("path")
module.exports = {
  HOST: "mtta.9mededu.com",
  view: {
    root: path.join(__dirname, "../app/public/dist/views")
  },
  static: {
    prefix: "/",
    dir: path.join(__dirname, "../app/public/dist")
  },
  cluster: {
    listen: {
      port: 8502,
      hostname: '127.0.0.1',
      workers: 1
    }
  },
  onerror: {
      all(err, ctx) {
          // 在此处定义针对所有响应类型的错误处理方法
          // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
          ctx.status = 500;
          ctx.body = '<div style="background: linear-gradient(180deg, #F6FBFF 0%, #E9F8FF 100%) no-repeat;width: 100%;height: 845px;background-size: 100%;display: flex;align-items: center;"><img style="width: 400px;margin-left: 294px;margin-right: 74px;" src="http://jhyl-static-file.oss-cn-hangzhou.aliyuncs.com/user_task/20191009153758.png" alt=""><div><p style="margin: 0;font-family: FZZDHJW--GB1-0;font-size: 48px;color: #239EFF;letter-spacing: 0;margin-bottom: 30px">平台正在升级维护</p><p style="margin: 0;font-family: PingFangSC-Regular;font-size: 16px;color: #474C63;letter-spacing: 0;margin-bottom: 15px">我们的程序员正在挑灯建设维护中......</p><p style="margin: 0;font-family: PingFangSC-Regular;font-size: 16px;color: #474C63;letter-spacing: 0;">敬请期待！</p></div></div>';
      }
  },
  apiurl : "http://api.mtta.9mededu.com/mtt_alliance_test/api/"
};