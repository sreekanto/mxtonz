var gulp            = require('gulp');
var sass            = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
var pug             = require('gulp-pug');
const babel         = require('gulp-babel');
var uglify          = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
var browserSync     = require('browser-sync').create();

 
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src([ 'src/scss/*.scss' ])
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/dist/assets/css'))
        pipe(browserSync.stream())
});
//pug file compile
gulp.task('pug', () => {
    return gulp.src(['src/pug/**/*.pug', 'src/pug/*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('src/dist/'))
});
// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([ 'src/js/*.js' ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('src/dist/assets/js'))
        .pipe(browserSync.stream());
});
//gulp image
gulp.task('image', () => {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/dist/assets/images'))
})
//gulp default
gulp.task('default', () => {
    gulp.watch(['src/pug/**/*.pug', 'src/pug/*.pug'], gulp.series('pug'))
    gulp.watch('src/scss/*.scss', gulp.series('sass'))
    gulp.watch('src/js/*.js', gulp.series('js'))
    gulp.watch('src/images/*', gulp.series('image'))
    gulp.watch('src/dist').on('change', browserSync.reload)
    browserSync.init({
        server: {
            baseDir: './src/dist'
        }
    })
})