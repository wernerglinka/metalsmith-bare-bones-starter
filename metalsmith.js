/* eslint-disable import/no-extraneous-dependencies */

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import Metalsmith from 'metalsmith';
import markdown from '@metalsmith/markdown';
import layouts from '@metalsmith/layouts';
import drafts from '@metalsmith/drafts';
import permalinks from '@metalsmith/permalinks';
import metadata from '@metalsmith/metadata';
import when from 'metalsmith-if';
import htmlMinifier from 'metalsmith-html-minifier';
import assets from 'metalsmith-static-files';

// ESM does not currently import JSON modules by default.
// Ergo we'll JSON.parse the file manually
import * as fs from 'fs';
const dependencies = JSON.parse( fs.readFileSync( './package.json' ) );

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const isProduction = process.env.NODE_ENV === 'production';

// functions to extend Nunjucks environment
const spaceToDash = ( string ) => string.replace( /\s+/g, '-' );
const condenseTitle = ( string ) => string.toLowerCase().replace( /\s+/g, '' );
const UTCdate = ( date ) => date.toUTCString( 'M d, yyyy' );
const blogDate = ( date ) => date.toLocaleString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } );
const trimSlashes = ( string ) => string.replace( /(^\/)|(\/$)/g, '' );

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
};

Metalsmith( __dirname )
  .source( './src/content' )
  .destination( './build' )
  .clean( true )
  .env( 'NODE_ENV', process.env.NODE_ENV )
  .env( 'DEBUG', process.env.DEBUG )
  .metadata( {
    msVersion: dependencies.metalsmith,
    nodeVersion: process.version
  } )
  .use( drafts( !isProduction ) )
  .use(
    metadata( {
      site: 'src/content/data/site.json',
      nav: 'src/content/data/navigation.json'
    } )
  )
  .use( markdown() )
  .use(
    permalinks( {
      relative: false
    } )
  )
  .use( layouts( templateConfig ) )
  .use(
    assets( {
      source: 'src/assets/',
      destination: 'assets/'
    } )
  )
  .use( when( isProduction, htmlMinifier() ) )
  .build( ( err ) => {
    if ( err ) {
      throw err;
    }
  } );
