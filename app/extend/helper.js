const moment = require('moment');

module.exports = {
    relativeTime(time, type) {
        return moment(time).format(type);
    },
    diffDay(etime,type) {
        var setTime = new Date(etime);
        var nowTime = new Date();
        var restSec = setTime.getTime() - nowTime.getTime();
        var day = parseInt(restSec / (60*60*24*1000));
        var hour = parseInt(restSec / (60*60*1000) % 24);
        var minu = parseInt(restSec / (60*1000) % 60);
        if (type == "days") {
            return day;
        }else if(type == "hours"){
            return hour;
        }else{
            return minu;
        }
    },
    changeTitle(title,text) {
        let add = ""
        if (!title.split(text)[0]) {
            add = "<p><span>"+ text +"</span>"+ title.split(text)[1] +"</p>"
        }else if(!title.split(text)[1]){
            add = "<p>"+ title.split(text)[0] + "<span>"+ text +"</span></p>"
        }else{
            let app = title.substr(title.indexOf(text) + text.length)
            add = "<p>"+ title.split(text)[0] + "<span>"+ text +"</span>"+ app +"</p>"
        }
        return add;
    },
    judgeTime(stime,etime,url){
        var setTime = new Date(stime);
        var endTime = new Date(etime);
        var nowTime = new Date();
        if (nowTime < setTime) {
            if (setTime - nowTime < 1800620) {
                return url
            }else{
                return 1
            }
        }else if(nowTime > setTime && nowTime < endTime){
           return url
        }else{
            if (nowTime - endTime < 1800620) {
                return url
            }else{
                return 2
            }
        }
    }
};