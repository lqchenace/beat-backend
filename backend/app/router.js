'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user',controller.user.index);
  router.get('/getadmin',controller.user.getadmin)
  router.get('/addadmin',controller.user.addadmin);
  router.get('/queryUser',controller.user.queryUser);
  router.get('/queryBlacklistUser',controller.user.queryBlacklistUser);
  router.get('/createblackUser',controller.user.createblackUser);

  router.post('/showBeat',controller.beat.showBeat);
  router.get('/ShowTheStyle',controller.beat.ShowTheStyle);
  router.post('/api/uploads',controller.home.uploadImg);
  router.post('/api/uploadheadImg',controller.home.uploadheadImg);
  router.post('/api/uploadidImg',controller.home.uploadidImg);

  router.post('/showBeatDetails',controller.beat.showBeatDetails);

  router.post('/addCertification',controller.certification.addCertification);
  router.post('/queryverify',controller.certification.queryverify);
  router.get('/queryverifylist',controller.certification.queryverifylist);
  router.get('/queryverifydetail',controller.certification.queryverifydetail);
  router.get('/confirmverify',controller.certification.confirmverify);

  router.post('/showmySave',controller.save.ShowmySave);
  router.post('/addSave',controller.save.addSave);
  router.post('/deleteSave',controller.save.deleteSave);

  router.post('/showmyFull',controller.full.ShowmyFull);
  router.post('/addFull',controller.full.addFull);
  router.post('/deleteFull',controller.full.deleteFull);
  router.post('/getfullnum',controller.full.getfullnum);

  router.post('/TheSaveShow',controller.save.TheSaveShow);
  router.post('/MyBeatList',controller.beat.MyBeatList);

  router.post('/FilterInfo',controller.user.FilterInfo);
  router.post('/showMyInfo',controller.user.showMyInfo);
  router.post('/getFollowList',controller.user.getFollowList);
  router.post('/updateuserinfo',controller.user.updateuserinfo);
  router.post('/showFansandFollownum',controller.user.getfollownum);
  router.post('/getperson',controller.user.getperson);
  router.get('/deleteUser',controller.user.deleteUser);

  router.post('/getProductlist',controller.beat.getProductlist);
  router.post('/showBeatComment',controller.beatcomment.showBeatComment);
  router.post('/addComment',controller.beatcomment.addComment);
  router.post('/showreployComment',controller.beatcomment.showreployComment);
  router.post('/showreploydetail',controller.beatcomment.showreploydetail);

  router.post('/showArrianbeatList',controller.arrianbeat.showArrianbeatList);
  router.post('/showrequirebeatList',controller.arrianbeat.showrequirebeatList);
  router.post('/showrequiredetail',controller.arrianbeat.showrequiredetail);
  router.post('/showGroom',controller.beat.showGroom);
  router.post('/addmyBeat',controller.beat.addmyBeat);
  router.post('/getsortnum',controller.beat.getsortnum);
  router.post('/addBeat',controller.beat.addBeat);
  router.post('/addForum',controller.forum.addForum);
  router.post('/getforumlist',controller.forum.getforumlist);
  router.post('/getforumsearchresult',controller.forum.getforumsearchresult);
  router.post('/getthesearchresult',controller.forum.getthesearchresult);
  router.post('/updateinfo',controller.forum.updateinfo);


  router.post('/showforumComment',controller.forumcomment.showforumComment);
  router.post('/addforumComment',controller.forumcomment.addforumComment);
  router.post('/showforumreployComment',controller.forumcomment.showforumreployComment);
  router.post('/showforumreploydetail',controller.forumcomment.showforumreploydetail);
};
