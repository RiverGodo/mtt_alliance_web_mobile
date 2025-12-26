const Service = require('egg').Service;
class ApiService extends Service {
    async curlPost(curl, param) {
        //默认配置
        let res_param = {};
        //解构对象
        const {
            ctx
        } = this;
        try {
            const result = await ctx.curl(this.app.config.apiurl + curl, {
                method: 'POST',
                contentType: 'json',
                data: param,
                dataType: 'json',
            });
            if (result.status == 200) {
                res_param = result.data;
            }
        } catch (err) {
            console.log(err);
        }
        return res_param
    }
}
module.exports = ApiService;