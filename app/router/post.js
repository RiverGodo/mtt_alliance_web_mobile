'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.post('/getDataDetial', controller.post.getDataDetial);
    router.post('/setCookies', controller.post.setCookies);
    router.post('/getSign', controller.post.getSign);
    router.post('/joinAlliance', controller.post.joinAlliance);
    router.post('/getcode', controller.post.GetSvgCode);
};