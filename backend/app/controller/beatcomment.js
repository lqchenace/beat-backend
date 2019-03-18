const Controller = require('egg').Controller;
//文件存储
const fs=require('fs');

const random = require('../util/random');

class BeatcommentController extends Controller {
    async showBeatComment(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let result = await ctx.app.model.Beatcomment.findAll({
            where:data,
            order:[['comtime','DESC']],
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
    async addComment(){
        let ctx = this.ctx;
        let {data}=ctx.request.body;
        let bcid=random.getRandomString(8);
        let res=await ctx.model.Beatcomment.create({
            bcid:bcid,
            uid:data.uid,
            bid:data.bid,
            comment:data.comment,
            comtime:data.comtime,
            parentid:data.parentid
            })
        if(res)
            res=1;
        else
            res=0;  

        ctx.body = {
            code:200,
            data:res
        };
    }
}
module.exports =BeatcommentController;
