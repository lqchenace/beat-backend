const Controller = require('egg').Controller;
const random = require('../util/random');
//文件存储
const fs=require('fs');

class SaveController extends Controller {
    //显示我收藏的约拍信息
    async TheSaveShow(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let result = await ctx.app.model.Save.findAll({
            where:data,
            include: [{model: ctx.app.model.Beat}]
        }).then(us =>us.map(u => u.toJSON()));
        result.map((item)=>{
            item.beatUrl=item.Beat.imgurl;
            item.imgurl=fs.readdirSync('app/'+item.Beat.imgurl);
        })
        ctx.body = {
            code:200,
            data:result
        };
    }
    // 查询是否有收藏该约拍
    async ShowmySave() {
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let save=await ctx.app.model.Save.findAll({
            where:data
        }).then(us =>us.map(u => u.toJSON()));
        console.log(save);
        ctx.body = {
            code:200,
            data:save
        };
    }  
    // 添加收藏
    async addSave() {
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        var sid=random.getRandomString(8);
        data.sid=sid;
        var add=await ctx.model.Save.create(data);
        ctx.body = {
            code:200,
            data:add
        };
    } 
    // 取消收藏
    async deleteSave(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        var del=await ctx.model.Save.destroy({where:data});
        ctx.body = {
            code:200,
            data:del
        };
    }
}

module.exports = SaveController;