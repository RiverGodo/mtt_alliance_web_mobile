'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.home.home); //主页
    router.get('home', '/home', controller.home.home); //主页 
    router.get('/notice_list/:id', controller.activity.activityDetail); //通知详情
    router.get('/notice_list', controller.activity.activityList); //通知列表
    router.get('/news_list', controller.news.newsList); //新闻列表
    router.get('/news_list/:id', controller.news.newsDetail); //新闻详情
    router.get('/video_list', controller.video.videoList); //视频列表
    router.get('/video_list/:id', controller.video.videoDetail); //视频详情
    router.get('/meeting_list/:id', controller.meeting.meetingDetail); //年会详情
    router.get('/meeting_list/:id/:guest_id', controller.meeting.guestDetial); //嘉宾详情
    router.get('/talent', controller.talent.talentDetail); //人才培养
    router.get('/talent/talent_inland', controller.talent.talentInland); //国内培训列表
    router.get('/talent/talent_foreign', controller.talent.talentForeign); //国外培训列表
    router.get('/talent/talent_back', controller.talent.talentBack); //项目回顾列表
    router.get('/talent/talent_inland_detial/:id', controller.talent.talentInlandDetial); //国内培训详情
    router.get('/talent/talent_foreign_detial/:country', controller.talent.talentForeignDetial); //国际培训详情
    router.get('/talent/talent_back_detial/:id', controller.talent.talentBackDetial); //项目回顾详情 
    router.get('/talent/talentDevDetailSimple', controller.talent.talentDevDetailSimple); //国际培训详情单页
    router.get('/datum', controller.datum.datum); //资料中心
    router.get('/datum/datum_text', controller.datum.datumText); //文本资料
    router.get('/datum/datum_text_detial', controller.datum.datumTextDetial); //文本资料详情
    router.get('/datum/datum_ppt', controller.datum.datumPpt); //演示文稿
    router.get('/datum/datum_ppt_detial', controller.datum.datumPptDetial); //演示文稿详情
    router.get('/datum/datum_video', controller.datum.datumVideo); //视频资料列表
    router.get('/datum/datum_video_detial', controller.datum.datumVideoDetial); //视频资料详情
    router.get('/datum/datum_pollicy', controller.datum.datumPollicy); //相关政策列表
    router.get('/datum/datum_pollicy_detial/:id', controller.datum.datumPollicyDetial); //相关政策详情
    router.get('/about', controller.about.about); //关于我们
    router.get('/characteristic/doctor', controller.characteristic.doctor); //乡村医生
    router.get('/characteristic', controller.characteristic.column); //特色专栏
    router.get('/research', controller.research.research); //科研创新
    router.get('/privacy', controller.privacy.privacy); //隐私政策
    router.get('/QA', controller.qa.qa); //隐私政策
    router.get('/alliance', controller.alliance.alliance); //成员伙伴
    router.get('/search', controller.search.search); //搜索页
    router.get('/search/search_detial', controller.search.searchDetial); //搜索结果页
};