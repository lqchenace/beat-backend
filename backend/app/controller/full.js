const Controller = require('egg').Controller;
const random = require('../util/random');


class FullController extends Controller {
    // 获取收到的点赞数量
async getfullnum(){
    let ctx = this.ctx;
    let {data}=ctx.request.body;
    let sequelize=this.app.Sequelize;

        let fullnum=await ctx.model.Full.findAll({
            where:data,
            attributes: [ [sequelize.fn('COUNT', sequelize.col('uid')), 'num']]
        }).then(us =>us.map(u => u.toJSON()));
    ctx.body ={
        code:200,
        data:{fullnum}
    };
}
    // 查询是否有点赞
    async ShowmyFull() {
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        let save=await ctx.app.model.Full.findAll({
            where:data
        }).then(us =>us.map(u => u.toJSON()));
        console.log(save);
        ctx.body = {
            code:200,
            data:save
        };
    }  
    // 点赞
    async addFull() {
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        var lid=random.getRandomString(8);
        data.lid=lid;
        var add=await ctx.model.Full.create(data);
        ctx.body = {
            code:200,
            data:add
        };
    } 
    // 取消点赞
    async deleteFull(){
        const ctx = this.ctx;
        const {data}=ctx.request.body;
        var del=await ctx.model.Full.destroy({where:data});
        ctx.body = {
            code:200,
            data:del
        };
    }
}

module.exports =FullController;