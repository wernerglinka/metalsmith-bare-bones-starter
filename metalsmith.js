/**
 * Metalsmith Build Configuration
 *
 * This file configures how Metalsmith builds your site. Each section is documented
 * to help beginners understand what's happening at each step.
 */

// These are built-in Node.js modules needed for file paths and operations
import { fileURLToPath } from 'node:url'; // Converts file:// URLs to file paths
import { dirname } from 'node:path'; // Handles file paths across different OS
import * as fs from 'node:fs'; // File system operations (read/write files)

// The main Metalsmith library and plugins that transform your content
import Metalsmith from 'metalsmith';  // The core static site generator
import drafts from '@metalsmith/drafts';  // Excludes draft content from builds
import metadata from '@metalsmith/metadata';  // Adds metadata to all files
import markdown from '@metalsmith/markdown';  // Converts Markdown to HTML
import permalinks from '@metalsmith/permalinks';  // Generates permalinks for files
import layouts from '@metalsmith/layouts';  // Applies templates to files
import assets from 'metalsmith-static-files'; // Copies static assets to build

// Plugins that optimize and enhance the production build output
import htmlOptimizer from 'metalsmith-optimize-html'; // Minifies HTML in production
import sitemap from 'metalsmith-sitemap'; // Generates a sitemap.xml file

// Development server and performance measurement
import browserSync from 'browser-sync';
import { performance } from 'node:perf_hooks'; // Performance measurement

/**
 * ESM (ECMAScript Modules) doesn't support importing JSON directly
 * So we read the package.json file manually to get dependency information
 * @type {Object}
 */
const dependencies = JSON.parse( fs.readFileSync( './package.json' ) ).dependencies;

/**
 * Get the site metadata
 * @type {Object}
 */
const siteData = JSON.parse( fs.readFileSync( './lib/data/site.json' ) );

// These variables help determine the current directory and file paths
const thisFile = fileURLToPath( import.meta.url ); // Gets the actual file path of this script
const thisDirectory = dirname( thisFile ); // Gets the directory containing this script
const mainFile = process.argv[ 1 ]; // Gets the file that was executed by Node.js

// Import Nunjucks filters
import nunjucksFilters from './lib/assets/nunjucks-filters.js';

/**
 * Configure the template engine (Nunjucks)
 * This defines how templates are processed and what options are available
 * @see https://mozilla.github.io/nunjucks/ for Nunjucks documentation
 */
const templateConfig = {
  directory: 'lib/layouts', // Where to find templates
  transform: 'nunjucks', // Template engine to use
  pattern: [ '**/*.html' ], // Files to apply templates to
  engineOptions: {
    smartypants: true, // Converts quotes, dashes, and ellipses to typographic equivalents
    smartLists: true, // Makes better list formatting
    filters: nunjucksFilters // Custom filters defined in lib/assets/nunjucks-filters.js
  }
};

/**
 * ENVIRONMENT SETUP
 * Determine if we're in production mode based on NODE_ENV environment variable
 * @type {boolean}
 */
const isProduction = process.env.NODE_ENV !== 'development';

// Variable to hold the development server instance
let devServer = null;

/**
 * Create a new Metalsmith instance
 * This is the core object that will build our site
 * @type {Metalsmith}
 */
const metalsmith = Metalsmith( thisDirectory );

/**
 * Configure the basic Metalsmith settings
 * These determine how Metalsmith will process our files
 * @see https://metalsmith.io/api/ for full API documentation
 */
metalsmith
  .clean( true )  // Clean the destination directory before building
  .watch( isProduction ? false : [ 'src', 'lib/layouts', 'lib/assets' ] ) // Watch for changes in development mode only
  .env( 'NODE_ENV', process.env.NODE_ENV ) // Pass NODE_ENV to plugins
  .source( './src' ) // Directory containing source files (content)
  .destination( './build' ) // Directory where the built site will be output
  .metadata( {
    msVersion: dependencies.metalsmith, // Metalsmith version for footer
    nodeVersion: process.version // Node.js version for footer
  } )

  /**
   * Filter out draft files in production
   * Draft files have 'draft: true' in their frontmatter
   * @see https://github.com/metalsmith/metalsmith-drafts
   */
  .use( drafts( !isProduction ) )

  /**
   * Add metadata to all files
   * This makes site-wide data available to all templates
   * @see https://github.com/metalsmith/metalsmith-metadata
   */
  .use(
    metadata( {
      site: 'lib/data/site.json', // Site-wide settings
      nav: 'lib/data/navigation.json' // Navigation structure
    } )
  )

  /**
   * Convert markdown to HTML
   * Processes all .md files and converts them to HTML
   * @see https://github.com/metalsmith/metalsmith-markdown
   */
  .use( markdown() )

  /**
   * Generate permalinks
   * Creates clean URLs by restructuring files (e.g., about.html → about/index.html)
   * @see https://github.com/metalsmith/permalinks
   */
  .use( permalinks() )

  /**
   * Apply templates
   * Wraps content in layout templates based on frontmatter
   * @see https://github.com/metalsmith/metalsmith-layouts
   */
  .use( layouts( templateConfig ) )

  /**
   * Copy static assets to the build directory
   * This includes CSS, JavaScript, images, and other static files
   * @see https://github.com/wernerglinka/metalsmith-static-files
   */
  .use(
    assets( {
      source: 'lib/assets/', // Where your assets are stored
      destination: 'assets/' // Where to copy them in the build
    } )
  );

/**
 * PRODUCTION OPTIMIZATIONS
 * These plugins only run in production mode to optimize the site
 */
if ( isProduction ) {
  metalsmith
    /**
     * Optimize HTML to reduce file size
     * Minifies HTML by removing whitespace, comments, etc.
     * @see https://github.com/wernerglinka/metalsmith-optimize-html
     */
    .use( htmlOptimizer() )

    /**
     * Generate a sitemap.xml file for search engines
     * Helps search engines discover and index your pages
     * @see https://github.com/ExtraHop/metalsmith-sitemap
     */
    .use(
      sitemap( {
        hostname: siteData.siteURL, // Your site's URL from site.json
        omitIndex: true, // Remove index.html from URLs
        omitExtension: true, // Remove .html extensions
        changefreq: 'weekly', // How often pages change
        lastmod: new Date(), // Last modification date
        pattern: [ '**/*.html', '!**/404.html' ], // Include all HTML except 404
        defaults: {
          priority: 0.5, // Default priority for pages
          changefreq: 'weekly', // Default change frequency
          lastmod: new Date() // Default last modified date
        }
      } )
    );
}

/**
 * BUILD EXECUTION
 * This section handles the actual build process and development server
 * It only runs when this file is executed directly (not when imported)
 */
if ( mainFile === thisFile ) {
  // Start timing the build for performance measurement
  let t1 = performance.now();

  // Execute the Metalsmith build
  metalsmith.build( ( err ) => {
    // Handle any build errors
    if ( err ) {
      throw err;
    }

    // Log build success and time taken
    /* eslint-disable no-console */
    console.log( `Build success in ${ ( ( performance.now() - t1 ) ).toFixed( 1 ) }ms` );

    // If watch mode is enabled, set up the development server
    if ( metalsmith.watch() ) {
      if ( devServer ) {
        // If server already exists, just reload it
        t1 = performance.now();
        devServer.reload();
      } else {
        // Otherwise, create a new BrowserSync server
        devServer = browserSync.create();
        devServer.init( {
          host: 'localhost', // Server hostname
          server: './build', // Directory to serve
          port: 3000, // Server port
          injectChanges: false, // Don't inject CSS changes, reload page
          reloadThrottle: 0 // Don't throttle reloads
        } );
      }
    }
  } );
}

// Export the Metalsmith instance for use in other files
export default metalsmith;
