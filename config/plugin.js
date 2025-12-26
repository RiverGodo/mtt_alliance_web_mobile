'use strict';

// had enabled by egg
// exports.static = true;
exports.security = {
    xframe: {
        enable: false,
    },
};
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};
exports.i18n = {
    enable: true,
    package: 'egg-i18n',
};