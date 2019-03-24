const Controller = require('egg').Controller;
//文件存储
const fs=require('fs');

const random = require('../util/random');

class ForumcommentController extends Controller {
    async showforumComment(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let result = await ctx.app.model.Forumcomment.findAll({
            where:data,
            order:[['comtime','ASC']],
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
        let res = await ctx.app.model.Forumcomment.findAll({
            where:data,
            include: [{model: ctx.app.model.User}]
        }).then(us =>us.map(u => u.toJSON()));
        res.map((item)=>{
            if(item.User.uid!='e3fe6790469ed968'){
            item.User.headimgUrl=item.User.headimg;
            item.User.headimg=fs.readdirSync('app/'+item.User.headimg);
            }else{
                item.User.headimgUrl=''; 
            }
    
        })
        ctx.body = {
            code:200,
            data:{
                result:result,
                res:res
            }
        };
    }
    // 回复我的评论
    // async showreployComment(){
    //     const ctx = this.ctx;
    //     const {data}=ctx.request.body;
    //     let result = await ctx.app.model.Beatcomment.findAll({
    //         where:{uid:{$ne:data.uid},
    //                 parentid:{$ne:'0'}
    //             },
    //     }).then(us =>us.map(u => u.toJSON()));
    //     let res= await ctx.app.model.Beatcomment.findAll().then(us =>us.map(u => u.toJSON()));
    //     ctx.body = {
    //         code:200,
    //         data:{result:result,
    //                 res:res}
    //     };
    // }
    // 找出评论我的人的信息和评论的约拍信息
    // async showreploydetail(){
    //     const ctx = this.ctx;
    //     const {data}=ctx.request.body;
    //     let result;
    //     if(data.bid.indexOf("fdg")==-1){
    //         result = await ctx.app.model.Beatcomment.findAll({
    //         where:{bcid:data.bcid},
    //         include: [{model: ctx.app.model.User},
    //                     {model: ctx.app.model.Beat}]
    //     }).then(us =>us.map(u => u.toJSON()));
    // }
    //     else{
    //         result = await ctx.app.model.Beatcomment.findAll({
    //             where:{bcid:data.bcid},
    //             include: [{model: ctx.app.model.User},
    //                         {model: ctx.app.model.Product}]
    //         }).then(us =>us.map(u => u.toJSON()));
    //     }
    //     console.log(result);
    //     result.map((item)=>{
    //         if(item.User.uid!='e3fe6790469ed968'){
    //         item.User.headimgUrl=item.User.headimg;
    //         item.User.headimg=fs.readdirSync('app/'+item.User.headimg);
    //         }else{
    //             item.User.headimgUrl=''; 
    //         }
    //     })

    //     ctx.body = {
    //         code:200,
    //         data:result
    //     };
    // }
    async addforumComment(){
        let ctx = this.ctx;
        let {data}=ctx.request.body;
        data.fcid=random.getRandomString(8);
        let res=await ctx.model.Forumcomment.create(data)
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
module.exports =ForumcommentController;