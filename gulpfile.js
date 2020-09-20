const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {

    browserSync({
        server: {
            baseDir: "dist/static"
        }
    });

    gulp.watch("src/static/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src("src/static/public/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("dist/static/public/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/static/public/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/static/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/static/public/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/static/public/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/static/public/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/static/public/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/static/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/static"));
});

gulp.task('scripts', function () {
    return gulp.src("src/static/public/js/**/*.js")
        .pipe(gulp.dest("dist/static/public/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/static/public/fonts/**/*")
        .pipe(gulp.dest("dist/static/public/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/static/public/icons/**/*")
        .pipe(gulp.dest("dist/static/public/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/static/public/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/static/public/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));