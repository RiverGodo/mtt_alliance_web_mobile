"use strict";
/**
 * @author wangchenzhao
 * @date 2018/11/20
 */
const path = require("path");
module.exports = app => {

  // 配置目录--验证
  const directory = path.join(app.config.baseDir, 'app/mock');
  app.loader.loadToApp(directory, 'mock');

}