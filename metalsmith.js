/* eslint-disable import/no-extraneous-dependencies */

const Metalsmith = require('metalsmith')
const markdown = require('@metalsmith/markdown')
const layouts = require('@metalsmith/layouts')
const drafts = require('@metalsmith/drafts')
const permalinks = require('@metalsmith/permalinks')
const metadata = require('@metalsmith/metadata')
const when = require('metalsmith-if')
const htmlMinifier = require('metalsmith-html-minifier')
const assets = require('metalsmith-static-files')
const { version } = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'

// functions to extend Nunjucks environment
const spaceToDash = (string) => string.replace(/\s+/g, '-')
const condenseTitle = (string) => string.toLowerCase().replace(/\s+/g, '')
const UTCdate = (date) => date.toUTCString('M d, yyyy')
const blogDate = (date) => date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
const trimSlashes = (string) => string.replace(/(^\/)|(\/$)/g, '')

// Define engine options for the inplace and layouts plugins
const templateConfig = {
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

Metalsmith(__dirname)
  .source('./src/content')
  .destination('./dist')
  .clean(true)
  .env('NODE_ENV', process.env.NODE_ENV)
  .env('DEBUG', process.env.DEBUG)
  .metadata({
    version
  })
  .use(drafts(!isProduction))
  .use(
    metadata({
      site: 'src/metadata/site.json',
      nav: 'src/metadata/navigation.json'
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
      source: 'src/assets/',
      destination: 'assets/'
    })
  )
  .use(when(isProduction, htmlMinifier()))
  .build((err) => {
    if (err) {
      throw err
    }
  })
