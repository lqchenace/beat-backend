const Controller = require('egg').Controller;
const random = require('../util/random');
const path=require('path');
const fs=require('fs');
class CertificaionController extends Controller {



    // 添加认证和投诉
    async addCertification(){
        let ctx = this.ctx;
        let {data}=ctx.request.body;
        let res;
        let id=random.getRandomString(8);
        if(data.uid2){
            data.coid=id;
            data.status='待处理';
            res=await ctx.model.Complain.create(data);
        }else{
        data.cerid=id;
        data.status='待审核';
        res=await ctx.model.Certification.create(data);
        }
        if(res)
            res=1;
        else
            res=0;  

        ctx.body = {
            code:200,
            data:res
        };
    }
    // 查询某人是否已经参加实名认证
    async queryverify(){
        let ctx=this.ctx;
        let {data}=ctx.request.body;
        let users=await ctx.model.Certification.findOne({where:data});
        ctx.body ={
            code:200,
            data:users
        };
    }

    // 查询认证列表
    async queryverifylist(){
        let ctx=this.ctx;
        let data = await ctx.query;
        let users;
        if(data.status=="待审核"||data.status=="已审核"){
        users=await ctx.model.Certification.findAll({where:data});
        }
        else
        users=await ctx.model.Complain.findAll({where:data});
        ctx.body ={
            code:200,
            data:users
        };
    }

    // 查询认证列表的详细信息
    async queryverifydetail(){
        let ctx=this.ctx;
        let data = await ctx.query;
        let sequelize=this.app.Sequelize;
        let users;
        console.log("data",data);
        if(data.cerid)
        users=await ctx.model.Certification.findOne({where:data,
            include: [{model: ctx.app.model.User}]
        }).then(us =>us.toJSON());
        else{
        users=await ctx.model.Complain.findOne({where:{coid:data.coid},
            include: [{model: ctx.app.model.User}]
        }).then(us =>us.toJSON());
        let comnum=await ctx.model.Complain.findAll({
            where:{
                uid2:data.uid2
            },
            attributes: [ [sequelize.fn('COUNT', sequelize.col('uid2')), 'num']]
            }).then(us =>us.map(u => u.toJSON()));
            users.num=comnum[0].num;
        }
            if(users.User.headimg.indexOf("https")==-1){
                users.headimgUrl=users.User.headimg;
                users.headimg=fs.readdirSync('app/'+users.User.headimg)[0];
                }else{
                    users.headimgUrl=''; 
                }
        ctx.body ={
            code:200,
            data:users
        };
    }
    // 审批通过
    async confirmverify(){
        let ctx=this.ctx;
        let data = await ctx.query;
        let res;
        console.log("9999999999999",data);
        if(data.cerid){
        let cerification =await ctx.model.Certification.update(
            {status:'已审核',worktime:data.worktime,adminid:data.adminid}, {
            where:{cerid: data.cerid}
        })
        if(cerification==1){
            let user =await ctx.model.User.update(
                {verify:'已认证',name:data.name,idcode:data.idcode,idimgurl:data.idimgurl}, {
                where:{uid: data.uid}
            })
            if(user==1)
            res=1;
            else
            res=0
        }
    }else{
        let cerification =await ctx.model.Complain.update(
            {status:'已处理',worktime:data.worktime,adminid:data.adminid}, {
            where:{coid: data.coid}
        })
        if(cerification)
        res=1;
        else
        res=0
    }
        ctx.body ={
            code:200,
            data:res
        };
    }

}

module.exports =CertificaionController;