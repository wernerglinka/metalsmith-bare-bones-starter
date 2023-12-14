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
const { version } = require("./package.json")
const { criticalCssPath } = require('./config')

const isProduction = process.env.NODE_ENV === "production"

const CYAN_START = '\x1b[36m';
const COLOR_END = '\x1b[0m';

// functions to extend Nunjucks environment
const spaceToDash = (string) => string.replace(/\s+/g, "-")
const condenseTitle = (string) => string.toLowerCase().replace(/\s+/g, "")
const UTCdate = (date) => date.toUTCString("M d, yyyy")
const blogDate = (date) => date.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })
const trimSlashes = (string) => string.replace(/(^\/)|(\/$)/g, "")

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
      trimSlashes
    }
  }
}

const loadCriticalCss = () => {
  const fs = require('fs');
  try {
    const criticalCss = fs.readFileSync(criticalCssPath, 'utf8');

    console.log("criticalCss content",  CYAN_START, criticalCss, COLOR_END);
    return criticalCss
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn("criticalCss content",  CYAN_START, criticalCssPath, 'not found but may be on purpose', COLOR_END);
      return;
    }
    console.error("criticalCss content",  CYAN_START, err.message, COLOR_END);
  }
}

console.log('metalsmith production:', isProduction)
Metalsmith(__dirname)
  .source("./src/content")
  .destination("./dist")
  .clean(isProduction)
  .env("NODE_ENV", process.env.NODE_ENV)
  .env("DEBUG", process.env.DEBUG)
  .metadata({
    version,
    basePath: process.env.BASE_PATH,
    faviconHash: "QEMO20KRr9",
    styleHash: "20231212",
    scriptHash: "20231212",
    criticalCss: loadCriticalCss()
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
