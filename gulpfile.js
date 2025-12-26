// Fix for Gulp 3.x compatibility with Node.js 20+
// This must be at the very top before any requires
const fs = require('fs');
const path = require('path');

// Patch graceful-fs used by vinyl-fs (which gulp uses)
try {
  // Try to find and patch the graceful-fs used by vinyl-fs
  const gulpModulePath = path.dirname(require.resolve('gulp'));
  const vinylFsPath = path.join(gulpModulePath, 'node_modules', 'vinyl-fs');
  const gracefulFsPath = path.join(vinylFsPath, 'node_modules', 'graceful-fs');
  
  // Patch the graceful-fs module before it's loaded
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  
  Module.prototype.require = function(id) {
    if (id === gracefulFsPath || (id.includes && id.includes('graceful-fs'))) {
      const gracefulFs = originalRequire.call(this, id);
      if (gracefulFs && typeof gracefulFs.gracefulify === 'function') {
        gracefulFs.gracefulify(fs);
      }
      return gracefulFs;
    }
    return originalRequire.call(this, id);
  };
  
  // Also try direct require
  try {
    const gracefulFs = require(gracefulFsPath);
    if (gracefulFs && typeof gracefulFs.gracefulify === 'function') {
      gracefulFs.gracefulify(fs);
    }
  } catch (e) {
    // Ignore
  }
} catch (e) {
  console.warn('Warning: Could not patch graceful-fs:', e.message);
}

// // Modules dependencies
var gulp = require('gulp')
var exec = require('child_process').exec;
var less = require('gulp-less')
var sourcemaps = require('gulp-sourcemaps')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var gulpSequence = require('gulp-sequence');
// path is already required at the top for the fix
var del = require('del');
var revReplace = require('gulp-rev-replace');
var cdn = require('gulp-cdn');
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
const preprocess = require('gulp-preprocess');
// 定义一个任务
gulp.task('script', function () {
    return gulp.src('src/**/*.js')
        .pipe(preprocess({
            context: {
                // 此处可接受来自调用命令的 NODE_ENV 参数，默认为 development 开发测试环境
                NODE_ENV: process.env.NODE_ENV || 'development',
            },
        }))
        .pipe(gulp.dest('app/public/dist'))
});
// 删除文件
// gulp.task('clean', function () {
//     del([
//         'app/public/dist/**/*',
//         'app/public/temp/**/*',
//         'app/public/rev/**/*',
//     ])
// });
// 压缩ejs
// gulp.task('ejs', function () {
// return gulp.src('views/**/*.ejs')
// .pipe(htmlmin({ collapseWhitespace: true }))
// .pipe(gulp.dest('dist/views/'))
// });
// 压缩less
gulp.task('less', function () {
    return gulp.src('app/public/pro/less/**/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 20 versions', 'Android >= 4.0'],
            cascade: false //是否美化属性值 默认：true
        }))
        .pipe(gulp.dest('app/public/pro/css/'));
});
//copy css
gulp.task('copycss', function () {
    return gulp.src(['app/public/pro/css/**/*.css'])
        .pipe(gulp.dest('app/public/temp/css/'))
        .pipe(reload({
            stream: true
        }));
})
//copy js
gulp.task('copyjs', function () {
    return gulp.src(['app/public/pro/js/**/*.js'])
        .pipe(gulp.dest('app/public/temp/js/'))
    // .pipe(reload({
    // stream: true
    // }));
    //js变化不通知浏览器，手动刷新处理
})
//copy img
gulp.task('copyimg', function () {
    return gulp.src(['app/public/pro/img/**/*'])
        .pipe(gulp.dest('app/public/temp/img/'))
    /* .pipe(reload({
    stream: true
    })); */
})
//拷贝静态文件
gulp.task('copyStatic', function () {
    return gulp.src(['app/public/pro/static/**/*'], {
            base: 'app/public/pro'
        })
        .pipe(rev())
        .pipe(gulp.dest('app/public/dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/public/rev/static'));
})
//拷贝单页应用
gulp.task('copyUserInfo', function () {
    return gulp.src(['app/public/pro/user-info/**/*'])
        .pipe(gulp.dest('app/public/dist/user-info'))
})
//最小化全部css
gulp.task('cssmin', ['copycss'], function () {
    return gulp.src('app/public/temp/**/*.css')
        .pipe(cssnano({
            reduceIdents: false, // 不压缩动画名字
            autoprefixer: false, // 不需要自动前缀
            zindex: false // 不压缩z-index
        }))
        .pipe(rev())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/public/dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/public/rev/css'));
})
// 压缩js
gulp.task('jsmin', ['copyjs'], function () {
    return gulp.src(['app/public/temp/**/*.js'])
        .pipe(babel())
        .pipe(sourcemaps.init())
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(rev())
        .pipe(uglify())
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/public/dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/public/rev/js'));
});
// 压缩img
gulp.task('imgmin', ['copyimg'], function () {
    return gulp.src(['app/public/temp/**/*.jpg', 'app/public/temp/**/*.ico', 'app/public/temp/**/*.gif', 'app/public/temp/**/*.png', '!app/public/temp/img/css/*']) //引入所有需处理的Img
        /* .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
        })) //压缩图片 */
        // 如果想对变动过的文件进行压缩，则使用下面一句代码
        // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(rev())
        .pipe(gulp.dest('app/public/dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('app/public/rev/img'))
    // .pipe(notify({ message: '图片处理完成' }));
});
// console.log(this.app);
//Html替换css、js文件版本
gulp.task("revHtml", function () {
    var manifest = gulp.src("app/public/rev/**/*.json");
    var myConfig = require('./gulpconfig.json');
    // console.log(myConfig);
    console.log(process.env.NODE_ENV);

    if (process.env.NODE_ENV == 'development') {
        return gulp.src('app/view/**/*.html')
            // .pipe(babel())
            .pipe(revReplace({
                manifest: manifest,
                // prefix: "//sfile.9mededu.com/mtta_web_mobile/dist" //是否使用cdn前缀
                prefix: myConfig.cdn
            }))
            .pipe(gulp.dest('app/public/dist/views'));
    } else if (process.env.NODE_ENV == 'test') {
        return gulp.src('app/view/**/*.html')
            // .pipe(babel())
            .pipe(revReplace({
                manifest: manifest,
                // prefix: "//sfile.9mededu.com/mtta_web_test_mobile/dist" //是否使用cdn前缀
                prefix: myConfig.testcdn
            }))
            .pipe(gulp.dest('app/public/dist/views'));
    }
});
gulp.task("revUserInfo", function () {
    // var myConfig = require('./gulpconfig.json');
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'development') {
        return gulp.src('app/public/dist/views/ucenter/index.html')
            .pipe(cdn({
                domain: "/user-info",
                cdn: "//sfile.9mededu.com/mtta_web_mobile/dist/user-info"
                // cdn:myConfig+"/user-info"
            }))
            .pipe(gulp.dest('app/public/dist/views/ucenter'));
    } else if (process.env.NODE_ENV == 'test') {
        return gulp.src('app/public/dist/views/ucenter/index.html')
            .pipe(cdn({
                domain: "/user-info",
                cdn: "//sfile.9mededu.com/mtta_web_test_mobile/dist/user-info"
                // cdn:myConfig+"/user-info"
            }))
            .pipe(gulp.dest('app/public/dist/views/ucenter'));
    }
});
// gulp.task("revEjs", function () {
// var manifest = gulp.src("app/public/rev/**/*.json");
// return gulp.src('app/view/**/*')
// .pipe(revReplace({
// manifest: manifest,
// replaceInExtensions:['.html','.ejs'],
// prefix: "https://sfile.tl100.com/mtta_web/dist" //是否使用cdn前缀
// //prefix: ""
// }))
// .pipe(gulp.dest('app/public/dist/views'));
// });

//开起浏览器同步
gulp.task('browserSync', function () {
    browserSync.init(null, {
        proxy: "localhost:3000",
        files: ["app/public/temp/css/*.*",
            "app/public/temp/js/*.*",
            "app/public/temp/js/**/*.*",
            "app/public/temp/img/*.*",
            "app/public/pro/static/**/*.*"
        ],
        // browser: "google chrome",
        notify: false,
        port: 3001
    });
    // 监听所有css文档
    gulp.watch('app/public/pro/less/**/*.less', ['less']);
    //监控其他静态资源变化
    gulp.watch(['app/public/pro/css/*'], ['copycss']);
    gulp.watch(['app/public/pro/js/**/*.js'], ['copyjs']);
    gulp.watch(['app/public/pro/img/*'], ['copyimg']);
    // 监听ejs
    gulp.watch('app/view/**/*.html', reload);
});
gulp.task('build', function (cb) {
    gulpSequence('script', 'less', ['cssmin', 'jsmin', 'imgmin'], ['copyStatic'], 'revHtml', cb);
});
gulp.task('dev', function (cb) {
    gulpSequence('less', ['copycss', 'copyjs', 'copyimg'], 'browserSync', cb);
});