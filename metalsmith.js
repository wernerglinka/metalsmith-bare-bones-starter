require("dotenv").config()

const Metalsmith = require("metalsmith")
const markdown = require("@metalsmith/markdown")
const layouts = require("@metalsmith/layouts")
const drafts = require("@metalsmith/drafts")
const permalinks = require("@metalsmith/permalinks")
const metadata = require("@metalsmith/metadata")
const when = require("metalsmith-if")
const htmlMinifier = require("metalsmith-html-minifier")
const assets = require("metalsmith-static-files")
const collections = require("@metalsmith/collections")
const { version } = require("./package.json")
const { cssFilePath, criticalCssPath, jsFilePath, svgSymbolsPath } = require("./config")
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production"
const basePath = process.env.BASE_PATH || ""
const CYAN_START = "\x1b[36m"
const COLOR_END = "\x1b[0m"

// functions to extend Nunjucks environment
const spaceToDash = (string) => string.replace(/\s+/g, "-")
const condenseTitle = (string) => string.toLowerCase().replace(/\s+/g, "")
const UTCdate = (date) => date.toUTCString("M d, yyyy")
const blogDate = (date) => date.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })
const trimSlashes = (string) => string.replace(/(^\/)|(\/$)/g, "")
const pathMdLink = (string) => string.replace(/\.md/g, "") + "/"

const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return bytes + ' Bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' MB';
  } else {
    return (bytes / 1073741824).toFixed(2) + ' GB';
  }
}

// Define engine options for the inplace and layouts plugins
const templateConfig = {
  directory: "./src/layouts",
  engineOptions: {
    smartypants: true,
    smartLists: true,
    filters: {
      spaceToDash,
      condenseTitle,
      UTCdate,
      blogDate,
      trimSlashes,
      formatBytes,
      pathMdLink
    }
  }
}

const getFilesize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
}

const loadCriticalCss = () => {
  try {
    let criticalCss = fs.readFileSync(criticalCssPath, "utf8")

    if (basePath) {
      const replacePath = "/assets/fonts"
      criticalCss = criticalCss.replaceAll(replacePath, basePath + replacePath)
    }

    console.log("criticalCss content", CYAN_START, criticalCss, COLOR_END)
    return criticalCss
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn("criticalCss", CYAN_START, criticalCssPath, "not found but may be on purpose", COLOR_END)
      return
    }
    console.error("criticalCss", CYAN_START, err.message, COLOR_END)
  }
}

const loadSvgSymbols = () => {
  try {
    const svgSymbols = fs.readFileSync(svgSymbolsPath, "utf8")

    console.log("svgSymbols content", CYAN_START, svgSymbols, COLOR_END)
    return svgSymbols
  } catch (err) {
    console.error("svgSymbols", CYAN_START, err.message, COLOR_END)
  }
}

console.log("metalsmith production:", isProduction)
Metalsmith(__dirname)
  .source("./src/content")
  .destination("./dist")
  .clean(isProduction)
  .env("NODE_ENV", process.env.NODE_ENV)
  .env("DEBUG", process.env.DEBUG)
  .metadata({
    version,
    basePath,
    imagePath: basePath + "/assets/images/",
    faviconHash: "QEMO20KRr9",
    styleHash: "20231220",
    scriptHash: "20231220",
    svgSymbols: loadSvgSymbols(),
    criticalCss: loadCriticalCss(),
    cssFilesize: getFilesize(cssFilePath),
    jsFilesize: getFilesize(jsFilePath),
    isProduction,
  })
  .use(drafts(!isProduction))
  .use(
    metadata({
      site: "src/metadata/site.json",
      nav: "src/metadata/navigation.json"
    })
  )
  .use(markdown())
  .use(
    permalinks({
      relative: false
    })
  )
  .use(collections({
    works: {
      refer: false, // if true, an error occurs
      reverse: true // newest date first
    }
  }))
  .use(layouts(templateConfig))
  .use(
    assets({
      source: "src/assets/",
      destination: "assets/"
    })
  )
  .use(
    assets({
      source: "src/assets-root/",
      destination: ""
    })
  )
  .use(when(isProduction, htmlMinifier()))
  .build((err) => {
    if (err) {
      throw err
    }
  })
