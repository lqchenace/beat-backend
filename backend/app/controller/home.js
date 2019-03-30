// 'use strict';

const Controller = require('egg').Controller;
//文件存储
const fs=require('fs');
const path=require('path');
const awaitWriteStream=require('await-stream-ready').write;
const senToWormhole=require('stream-wormhole');

class HomeController extends Controller {
  // async index() {
  //   this.ctx.body = 'hi, egg';
  // }
  
  async uploadImg(){
    const ctx = this.ctx;
    const stream=await ctx.getFileStream();

    // 获取上传者的id
    let uid=stream.fieldname.split("#")[0];
    let bid=stream.fieldname.split("#")[1];
    let i=stream.fieldname.split("#")[2];
    let target,imgurl;
    // 生成约拍id
    // random.getRandomString(8);
    //文件名：随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 判断对应的约拍文件夹是否已经生成
    if(bid.indexOf("fgd")==-1&&bid.indexOf("fode34j")==-1){
        if(i==0){
        if(! fs.existsSync())
        fs.mkdirSync(path.join(this.config.baseDir,'app/public/'+uid+'/beat',bid));
        }
        target = path.join(this.config.baseDir, 'app/public/'+uid+'/beat/'+bid, filename);
        imgurl='public/'+uid+'/beat/'+bid;
      }else if(bid.indexOf("fode34j")!=-1){
        if(i==0){
          if(! fs.existsSync())
          fs.mkdirSync(path.join(this.config.baseDir,'app/public/'+uid+'/forum',bid));
          }
          target = path.join(this.config.baseDir, 'app/public/'+uid+'/forum/'+bid, filename);
          imgurl='public/'+uid+'/forum/'+bid;
      }else{
        if(i==0){
          if(! fs.existsSync())
          fs.mkdirSync(path.join(this.config.baseDir,'app/public/'+uid+'/project',bid));
          }
          target = path.join(this.config.baseDir, 'app/public/'+uid+'/project/'+bid, filename);
        imgurl='public/'+uid+'/project/'+bid;
      }
        // 生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            // 异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
    ctx.body = {
      code:200,
      data:{
            imgurl
          }

    };
  }
  //  上传头像图片
  async uploadheadImg(){
    const ctx = this.ctx;
    const stream=await ctx.getFileStream();
    let uid=stream.fieldname;
    console.log("1111111",uid);
    // random.getRandomString(8);
    //文件名：随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 同步读取文件
    var files = fs.readdirSync('app/public/'+uid+'/img');//读取该文件夹

    files.forEach(function(file){

    var stats = fs.statSync('app/public/'+uid+'/img'+'/'+file);

          if(stats.isDirectory()){

          emptyDir('app/public/'+uid+'/img'+'/'+file);

        }else{

          fs.unlinkSync('app/public/'+uid+'/img'+'/'+file); 

          console.log("删除文件"+'app/public/'+uid+'/img'+'/'+file+"成功");

          }   
        })

        let target = path.join(this.config.baseDir, 'app/public/'+uid+'/img', filename);
        let imgurl='public/'+uid+'/img';
    
        // 生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            // 异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
    ctx.body = {
      code:200,
      data:{
            imgurl
          }

    };
  }

  // 上传身份证照申请实名认证
    async uploadidImg(){
      const ctx = this.ctx;
      const stream=await ctx.getFileStream();
      let uid=stream.fieldname;
      console.log("1111111",uid);
  
      //文件名：随机数+时间戳+原文件后缀
      // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
      const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
  
          let target = path.join(this.config.baseDir, 'app/public/'+uid, filename);
          let imgurl='public/'+uid+'/'+filename;
      
          // 生成一个文件写入 文件流
          const writeStream = fs.createWriteStream(target);
          try {
              // 异步把文件流 写入
              await awaitWriteStream(stream.pipe(writeStream));
          } catch (err) {
              // 如果出现错误，关闭管道
              await sendToWormhole(stream);
              throw err;
          }
      ctx.body = {
        code:200,
        data:{
              imgurl
            }
  
      };
    }

}

module.exports = HomeController;
