'use strict';

const Controller = require('egg').Controller;

//token:this.ctx.app.config.tokenName
class PostController extends Controller {
    async getSign() {

        let msg = this.ctx.request.body;
        let SignList = await this.ctx.service.api.curlPost("v1/oss/getSign", msg)
        this.ctx.body = {
            SignList
        }
    }
    async joinAlliance() {
        let uid = this.ctx.cookies.get('uid')
        let msg = this.ctx.request.body;
        msg.id = uid
        let joinAllianceList = await this.ctx.service.api.curlPost("v1/alliance/joinAlliance", msg)
        console.log(joinAllianceList);
        this.ctx.body = {
            joinAllianceList
        }
    }

    async GetSvgCode() {
        let uid = this.ctx.cookies.get('uid')
        console.log(uid)
        let baseCodeResult = await this.ctx.service.base.GetSvgCode({
            id: uid
        })
        this.ctx.body = {
            baseCodeResult
        }

    }

    async getDataDetial() {
        this.ctx.body = {
            res: "wsq"
        }
    }
    async setCookies() {
        const formData = this.ctx.request.body;
        this.ctx.cookies.set(formData.title, formData.data, {
            httpOnly: false
        })
        this.ctx.body = {
            formData
        }
    }
}

module.exports = PostController