/* eslint-disable import/no-extraneous-dependencies */

const inPlace = require('@metalsmith/in-place');
const layouts = require('@metalsmith/layouts');
const drafts = require('@metalsmith/drafts');
const permalinks = require('@metalsmith/permalinks');
const when = require('metalsmith-if');
const htmlMinifier = require('metalsmith-html-minifier');
const debugUI = require('metalsmith-debug-ui');
const assets = require('metalsmith-assets');
const metadata = require('metalsmith-metadata');
const marked = require('marked');
const Metalsmith = require('metalsmith');

const nodeVersion = process.version;
const isProduction = process.env.NODE_ENV === 'production';

// functions to extend Nunjucks environment
const toUpper = string => string.toUpperCase();
const spaceToDash = string => string.replace(/\s+/g, '-');
const condenseTitle = string => string.toLowerCase().replace(/\s+/g, '');
const UTCdate = date => date.toUTCString("M d, yyyy");
const blogDate = date => date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const trimSlashes = string => string.replace(/(^\/)|(\/$)/g, "");
const md = (mdString) => {
  try {
    return marked.parse(mdString);
  } catch (e) {
    console.error('Error parsing markdown:', e);
    return mdString;
  }
}

// Define engine options for the inplace and layouts plugins
const templateConfig = {
  directory: "templates",
  engineOptions: {
    smartypants: true,
    smartLists: true,
    filters: {
      toUpper,
      spaceToDash,
      condenseTitle,
      UTCdate,
      blogDate,
      trimSlashes,
      md,
    }
  },
};

const metalsmith = isProduction ? Metalsmith(__dirname) : debugUI.patch(Metalsmith(__dirname));
metalsmith
  .source('./src/content')
  .destination('./build')
  .clean(true)
  
  .use(when(isProduction, drafts()))

  .use(metadata({
    site: "data/site.json",
    nav: "data/navigation.json"
  }))
  
  .use(
    inPlace(templateConfig)
  )

    /*
  .use(function plugin(files, metalsmith, done) {
    console.log("running ms");
  
    Object.keys(files).forEach(file => {
      console.log(files[file]);
    });
    done();
    
  })
  */

  .use(permalinks())

  .use(
    layouts(templateConfig)
  )

  .use(
    assets({
      source: './src/assets/',
      destination: './assets/',
    })
  )

  .use(when(isProduction, htmlMinifier()))
  .build(err => {
    if (err) {
      throw err;
    }
  });
