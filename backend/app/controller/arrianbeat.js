const Controller = require('egg').Controller;
//文件存储
const fs=require('fs');

const random = require('../util/random');

class ArrianbeatController extends Controller {
    async showArrianbeatList(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let result = await ctx.app.model.Arrianbeat.findAll({
            where:data,
            include: [{model: ctx.app.model.User}]
        }).then(us =>us.map(u => u.toJSON()));
        result.map((item)=>{
            if(item.User.uid!='e3fe6790469ed968'){
            item.User.headimgUrl=item.User.headimg;
            item.User.headimg=fs.readdirSync('app/'+item.User.headimg);
            }else{
                item.User.headimgUrl=''; 
            }
    
        })
        ctx.body = {
            code:200,
            data:result
        };
    }
}
module.exports =ArrianbeatController;