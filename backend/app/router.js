'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.post('/user',controller.user.index);
  router.get('/test',controller.user.test);
  router.post('/showBeat',controller.beat.showBeat);
  router.get('/ShowTheStyle',controller.beat.ShowTheStyle);
  router.post('/api/uploads',controller.home.uploadImg);
  router.post('/showBeatDetails',controller.beat.showBeatDetails);

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
  router.post('/showFansandFollownum',controller.user.getfollownum);
  router.post('/getperson',controller.user.getperson);

  router.post('/getProductlist',controller.beat.getProductlist);
  router.post('/showBeatComment',controller.beatcomment.showBeatComment);
  router.post('/addComment',controller.beatcomment.addComment);
  router.post('/showreployComment',controller.beatcomment.showreployComment);
  router.post('/showreploydetail',controller.beatcomment.showreploydetail);

  router.post('/showArrianbeatList',controller.arrianbeat.showArrianbeatList);
  router.post('/showrequirebeatList',controller.arrianbeat.showrequirebeatList);
  router.post('/showrequiredetail',controller.arrianbeat.showrequiredetail);
  router.post('/showGroom',controller.beat.showGroom);
  router.post('/addBeat',controller.beat.addBeat);
  router.post('/getsortnum',controller.beat.getsortnum);
  router.post('/addBeat',controller.beat.addBeat);
};
