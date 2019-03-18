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
  router.post('/TheSaveShow',controller.save.TheSaveShow);
  router.post('/MyBeatList',controller.beat.MyBeatList);
  router.post('/FilterInfo',controller.user.FilterInfo);
  router.post('/showMyInfo',controller.user.showMyInfo);
  router.post('/getFollowList',controller.user.getFollowList);
  router.post('/showFansandFollownum',controller.user.getfollownum);
  router.post('/getProductlist',controller.beat.getProductlist);
  router.post('/showBeatComment',controller.beatcomment.showBeatComment);
  router.post('/addComment',controller.beatcomment.addComment);
  router.post('/showArrianbeatList',controller.arrianbeat.showArrianbeatList);
  router.post('/showGroom',controller.beat.showGroom);
};
