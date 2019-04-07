const Controller = require('egg').Controller;
//文件存储
const fs=require('fs');

class ArrianbeatController extends Controller {

    async updatearrianbeat(){
        let ctx = this.ctx;
        let {data}=ctx.request.body;
        console.log("eeee",data);
        let res;
        let user=await ctx.model.User.findOne({where:{uid:data.uid}}).then(us =>us.toJSON());
        let money=user.money-1;
        let info =await ctx.model.User.update({money:money}, {
            where:{uid: data.uid}
        })
        console.log("aaaaa",info);
        if(info[0]==1)
        res =await ctx.model.Arrianbeat.update({looked:1}, {
                    where:{aid: data.aid}
                })
        else
        res=0;
        console.log("bbbbbb",res);
        ctx.body = {
            code:200,
            data:res
        }; 
    }
    async showArrianbeatList(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let result = await ctx.app.model.Arrianbeat.findAll({
            where:data,
            include: [{model: ctx.app.model.User}]
        }).then(us =>us.map(u => u.toJSON()));
        result.map((item)=>{
            if(item.User.headimg.indexOf("https")==-1){
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

        async showrequiredetail(){
            const ctx = this.ctx;
            const {data}=ctx.request.body;
            let result = await ctx.app.model.Arrianbeat.findAll({
                where:data,
                include: [{model: ctx.app.model.User},
                            {model: ctx.app.model.Beat}]
            }).then(us =>us.map(u => u.toJSON()));
            result.map((item)=>{
                if(item.User.headimg.indexOf("https")==-1){
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

    async showrequirebeatList(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        // console.log("vvv",data);
        let result;
        if(data.sort=='mybeat'){
        result = await ctx.app.model.Arrianbeat.findAll({
            where:{uid:data.uid},
            include: [{model: ctx.app.model.Beat,
                        include:[{model:ctx.app.model.User}] }]
        }).then(us =>us.map(u => u.toJSON()));
        result.map((item)=>{
            if(item.Beat.User.headimg.indexOf("https")==-1){
            item.Beat.User.headimgUrl=item.Beat.User.headimg;
            item.Beat.User.headimg=fs.readdirSync('app/'+item.Beat.User.headimg);
            }else{
                item.Beat.User.headimgUrl=''; 
            }
    
        })
        }
        else{
            result = await ctx.app.model.Beat.findAll({
                where:{uid:data.uid},
                include: [{model: ctx.app.model.Arrianbeat,
                            include:[{model: ctx.app.model.User}] }]
            }).then(us =>us.map(u => u.toJSON()));
            // console.log("11111",result);
            result=result.filter((item)=>{
                return item.arrianbeat!=null
            })
            result.map((item)=>{
                if(item.arrianbeat.User.headimg.indexOf("https")==-1){
                item.arrianbeat.User.headimgUrl=item.arrianbeat.User.headimg;
                item.arrianbeat.User.headimg=fs.readdirSync('app/'+item.arrianbeat.User.headimg);
                }else{
                    item.arrianbeat.User.headimgUrl=''; 
                }
            })
        }
        // console.log("vvv",result);
        ctx.body = {
            code:200,
            data:result
        };
    }
}
module.exports =ArrianbeatController;