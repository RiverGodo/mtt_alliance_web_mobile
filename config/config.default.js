
'use strict';

var path = require("path")
module.exports = {
  // use for cookie sign key, should change to your own and keep security
  keys: 'mtta_web_030342034',
  tokenName: 'mtta_web_token',
  middleware: ["gzip"],
  security: {
    csrf: {
      enable: false,
    },
  },
  view: {
    defaultViewEngine: 'ejs',
    ejs: {
      cache: true,
    },
    mapping: {
      '.html': 'ejs'
    },
  },
  i18n: {
     // 默认语言，默认 "en_US"
    defaultLocale: 'zh-CN',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 的 domain 配置，默认为空，代表当前域名有效
    cookieDomain: '',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  },
  cdn:"//sfile.9mededu.com/mtta_web_mobile/dist",
  testcdn:"//sfile.9mededu.com/mtta_web_test_mobile/dist"
};



