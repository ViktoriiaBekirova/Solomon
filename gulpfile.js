let gulp        = require('gulp');
sass            = require('gulp-sass');
browserSync     = require('browser-sync');
concat          = require('gulp-concat');
cssnano         = require('gulp-cssnano');
rename          = require('gulp-rename');
del             = require('del');
imagemin        = require('gulp-imagemin');
pngquant        = require('imagemin-pngquant');
cache           = require('gulp-cache');
autoprefixer    = require('gulp-autoprefixer');
fileinclude     = require('gulp-file-include');
postcss         = require('gulp-postcss');
sourcemaps      = require('gulp-sourcemaps');
inlinesvg       = require('postcss-inline-svg');


gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([inlinesvg()]))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'fileinclude', 'css-libs'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fileinclude', function() {
    gulp.src(['app/js/scripts.js'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/scripts/'))
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

    let buildCss = gulp.src([
        'app/css/main.css',
        'app/css/jquery.datetimepicker.min.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    let buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    let buildJs = gulp.src([
        'app/scripts/scripts.js'
    ])
        .pipe(gulp.dest('dist/scripts'));

    let buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default',['watch']);