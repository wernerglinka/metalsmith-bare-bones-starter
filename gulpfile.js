const fs = require("fs")
const { exec } = require("child_process")
const gulp = require("gulp")
const imagemin = require("gulp-imagemin")
const svgmin = require("gulp-svgmin")
const svgSymbols = require("gulp-svg-symbols")
const imageminJpegRecompress = require("imagemin-jpeg-recompress")
const imageminPngquant = require("imagemin-pngquant")

const production = process.env.NODE_ENV === "production"
// const production = false;

const browserify = require("browserify")
const babelify = require("babelify")
const source = require("vinyl-source-stream")
const buffer = require("vinyl-buffer")
const uglify = require("gulp-uglify")
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("autoprefixer")
const postcss = require("gulp-postcss")
const cssnano = require("cssnano")
const noop = require("gulp-noop")
const browserSync = require("browser-sync").create()
const { srcLayoutsDir, criticalCssPath, browserSyncPort, srcDir, srcAssetsRootDir, srcAssetsDir, imageDirs } = require("./config")

const svgOriginalFiles = `${srcDir}svg-original/**/*`
const outputDir = srcAssetsDir

const paths = {
  styles: {
    src: `${srcDir}scss/style.scss`,
    watchSrc: `${srcDir}scss/**/*.scss`
  },
  scripts: {
    entries: [`${srcDir}js/app.entry.js`],
    src: [`${srcDir}js/**/*.js`]
  },
  site: [
    `${srcDir}assets/**/*`,
    `${srcDir}assets-root/**/*`,
    `${srcDir}content/**/*`,
    `${srcDir}layouts/**/*`,
    `${srcDir}metadata/**/*`
  ]
}

/** JS * */

const scripts = () =>
  browserify({
    entries: [paths.scripts.entries],
    transform: [
      babelify.configure({
        presets: ["@babel/preset-env"],
        sourceMaps: !production
      })
    ]
  })
    .bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(!production ? sourcemaps.init({ loadMaps: true }) : noop())
    .pipe(production ? uglify() : noop())
    .pipe(!production ? sourcemaps.write(".") : noop())
    .pipe(gulp.dest(outputDir))

exports.scripts = scripts

/** CSS * */

const postCssPlugins = [
  autoprefixer({
    cascade: false
  }),
  production ? cssnano() : false
].filter(Boolean)

// CSS needs to go after svg icons, so it can use the svg icons scss
const css = () =>
  gulp
    .src(paths.styles.src)
    .pipe(!production ? sourcemaps.init({ loadMaps: true }) : noop())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(!production ? sourcemaps.write(".") : noop())
    .pipe(gulp.dest(srcAssetsDir))

exports.css = css

const stylelint = (done) => {
  exec(`stylelint ${paths.styles.watchSrc}`, (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    done(err)
  })
}

exports.stylelint = stylelint

/** images * */

const imagePipe = () => {
  return imagemin(
      [
        imageminJpegRecompress({
          loops: 4,
          min: 50,
          max: 95,
          quality: "high"
        }),
        imageminPngquant()
      ],
      {
        verbose: true
      }
    )
}

const imagesRoot = () => {
  return gulp
    .src(imageDirs.src)
    .pipe(imagePipe())
    .pipe(gulp.dest(imageDirs.dist))
}
const imagesPreview = () => {
  return gulp
    .src(imageDirs.srcPreviews)
    .pipe(imagePipe())
    .pipe(gulp.dest(imageDirs.distPreviews))
}
const contentImagesResize444 = (done) =>
  exec(`node image-resize.js ${imageDirs.srcContent} ${imageDirs.distContent} 444 -md`, (err, stdout, stderr) => {
  console.log(stdout)
  console.log(stderr)
  done(err)
})
const contentImagesResize888 = (done) =>
  exec(`node image-resize.js ${imageDirs.srcContent} ${imageDirs.distContent} 888 -lg`, (err, stdout, stderr) => {
  console.log(stdout)
  console.log(stderr)
  done(err)
})
const imagesContent = (done) => {
  return gulp.parallel(
    contentImagesResize444,
    contentImagesResize888
  )(done)
}

const images = gulp.series(
  imagesRoot,
  imagesPreview,
  imagesContent
)
exports.images = images

/** svg symbols * */

// SVG icons needs to go before CSS, so it can use the svg icons scss
const svgsymbols = () =>
  gulp
    .src(svgOriginalFiles)
    .pipe(svgmin())
    .pipe(
      svgSymbols({
        svgAttrs: {
          class: "svg-icon-lib"
        },
        templates: ["default-svg", "default-scss"],
        id: "icon-%f",
        class: ".icon-%f",
        title: "Icon %f"
      })
    )
    .pipe(gulp.dest(srcLayoutsDir))

exports.svgsymbols = svgsymbols

/**
 * metalsmith build
 *
 * does clean up the dir!
 * copies to ./dist
 * */

const buildMetalsmith = (done) => {
  exec("node metalsmith.js", (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    done(err)
  })
}

/**
 * critical css
 *
 * needs to run when serving
 * */

const removeCriticalCss = (done) => {
  console.log(criticalCssPath)
  try {
    fs.unlinkSync(criticalCssPath)
  } catch (err) {
    console.log(err.message)
  } finally {
    done()
  }
}

const criticalCss = (done) => {
  exec("env DEBUG='penthouse,penthouse:*' node penthouse.config.js", (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    done(err)
  })
}

const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: browserSyncPort,
    open: false
  })
  done()
}
const serveStop = (done) => {
  browserSync.exit()
  done()
}

/** build * */

const build = gulp.series(gulp.parallel(scripts, images, svgsymbols), css, buildMetalsmith)
exports.build = build

const buildProd = gulp.series(
  (done) => {
    console.log("gulp production:", production)
    done()
  },
  removeCriticalCss,
  build,
  serve,
  criticalCss,
  serveStop,
  build
)

exports.buildProd = buildProd

/** watch * */

const watch = () => {
  build()

  gulp.watch(paths.site, buildMetalsmith)

  // TODO just copy new build artifacts (styles, scripts, images) to dist. not whole metalsmith build
  gulp.watch(paths.styles.watchSrc, gulp.series(stylelint, css, buildMetalsmith))

  gulp.watch(paths.scripts.src, gulp.series(scripts, buildMetalsmith))

  gulp.watch(imageDirs.src, gulp.series(images, buildMetalsmith))
}

exports.watch = watch

exports.default = watch
