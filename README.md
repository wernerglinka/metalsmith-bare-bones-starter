# My Website

This is my website build with the static website generator [metalsmith](https://metalsmith.io/).

## Dev

- `npm start` is doing watching and serving

### Config

- `config.js`: storing simple props for the various build files
- `gulp.js`: this is main build tool file.
- `postcss.config.js`: this is a helper config for gulp style building.
- `metalsmith.js`: this is the Metalsmith build tool file.
- `penthouse.config.js`: this is the critical CSS build tool file.

### Serve

Your site is now running at `http://localhost:3000`!

Edit `src/content/index.md`. Save your changes and the browser will update.

## Build 

The build chain is rather complex here.
But so you have a freedom to adjust it.

- `npm run build`
- `npm run build:prod` for production build, which also creates with a critical CSS

We have here assets which go into an `assets` sub dir in the `./dist` dir.
There is also a `assets-root` dir which contents move direct into the root of the `dist` dir.

### dist dir

Is cleaned up on a metalsmith build.
Only the metalsmith build puts things into the dist dir currently.

### assets-root

These are files which are expected to be in root of this website.

They contain the `faviconHash` which in metalsmith gets added by the build script run. 
So not here!

### critical CSS

To create a critical CSS it is necessary here that we have a website built and running to take a snapshot with the criticalCss tool.

After that it is necessary to build the site again.

## Lint

- `npm run lint`

## Deploy

- is done with GitHub actions
