'use strict';
var path = require("path")
module.exports = {
  HOST: "http://localhost:8502",
  logger: {
    level: 'DEBUG',
  },
  static: {
    prefix: "/",
    dir: path.join(__dirname, "../app/public/pro")
  },
  // apiurl: "http://192.168.6.50:5500/mtt_alliance_test/api/"
  apiurl : "http://api.mtta.9mededu.com/mtt_alliance_test/api/"
};