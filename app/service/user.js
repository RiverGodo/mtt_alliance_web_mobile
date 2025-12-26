const Service = require('egg').Service;

class chatRoom extends Service {
  async getUserInfo (token) {
    let userInfo = await this.ctx.service.api.curlPost('user/getUsreDetail',{
      token: token
    })
    if (userInfo.res_code == 1) { 
      this.ctx.cookies.set("new_msg",userInfo.data.new_msg,{
        expires: new Date(Date.now() + 1000 * 3600 * 24),
        httpOnly:false
      })     
      return {
        userInfo: userInfo.data
      }
    }else{
        console.log(userInfo);
    }
  }
}

module.exports = chatRoom;