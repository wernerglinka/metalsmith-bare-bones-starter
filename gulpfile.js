const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgSymbols = require('gulp-svg-symbols');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const { exec } = require('child_process')

const production = process.env.NODE_ENV === 'production';
// const production = false;

const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const gulpStylelint = require('@ronilaukkarinen/gulp-stylelint'); // https://github.com/olegskl/gulp-stylelint/issues/132#issuecomment-957267876
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const noop = require("gulp-noop");

const srcDir = './src/',
  svgOriginalFiles = srcDir + 'svg-original/**/*',
  outputDir = './dist';

const paths = {
  styles: {
    src: srcDir + 'scss/style.scss',
    watchSrc: srcDir + 'scss/**/*.scss',
  },
  scripts: {
    entries: [
      srcDir + 'js/app.entry.js'
    ],
    src: [
      srcDir + 'js/**/*.js'
    ]
  },
  images: {
    src: srcDir + 'images-original/**/*',
    dist: outputDir + '/images'
  },
  site: [
    srcDir + 'assets/**/*',
    srcDir + 'assets-root/**/*',
    srcDir + 'content/**/*',
    srcDir + 'layout/**/*',
    srcDir + 'metadata/**/*'
  ]
};

/** JS **/

function scripts() {
  console.log('production:', production)
  return (

    browserify({
      entries: [paths.scripts.entries],
      transform: [babelify.configure({
        presets: ["@babel/preset-env"],
        sourceMaps: !production
      })]
    })
      .bundle()
      .pipe(source("s.js"))
      .pipe(buffer())
      .pipe(!production ? sourcemaps.init({loadMaps: true}) : noop())
      .pipe(production ? uglify() : noop())
      .pipe(!production ? sourcemaps.write('.') : noop())
      .pipe(gulp.dest(outputDir))
  );
}

exports.scripts = scripts;

/** CSS **/

const postCssPlugins = [
  autoprefixer({
    cascade: false
  }),
  production ? cssnano() : false
].filter(Boolean);

function css() {
  return gulp
    .src(paths.styles.src)
    .pipe(!production ? sourcemaps.init({loadMaps: true}) : noop())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(!production ? sourcemaps.write('.') : noop())
    .pipe(gulp.dest(outputDir));
}

exports.css = css;

function stylelint() {
  return gulp.src(paths.styles.watchSrc)
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
}

exports.stylelint = stylelint;

/** images **/

const  images = function() {
  return gulp.src(paths.images.src)
    .pipe(imagemin([
      imageminJpegRecompress({
        loops:4,
        min: 50,
        max: 95,
        quality:'high'
      }),
      imageminPngquant()
    ],{
      verbose: true
    }))
    .pipe(gulp.dest(paths.images.dist));
};

exports.images = images;

/** svg symbols **/

const svgsymbols = function() {
  return gulp.src(svgOriginalFiles)
    .pipe(svgmin())
    .pipe(svgSymbols({
      templates: ['default-svg', 'default-demo'],
      id: 'svg-icon-%f',
      title: 'svg-icon-%f'
    }))
    .pipe(gulp.dest(outputDir))
};

exports.svgsymbols = svgsymbols;

/** **/

const buildMetalsmith = () => {
  return exec('node metalsmith.js')
}

/** build **/

const build = gulp.parallel(buildMetalsmith, scripts, css, images, svgsymbols);
exports.build = build;

/** watch **/

const watch = function() {
  build()

  gulp.watch(paths.site, buildMetalsmith);

  gulp.watch(paths.styles.watchSrc, gulp.series(stylelint, css));

  gulp.watch(paths.scripts.src, scripts);

  gulp.watch(paths.images.src, images);
}

exports.watch = watch;

exports.default = gulp.series(build, watch);


