# My Website

This is my website build with the static website generator [metalsmith](https://metalsmith.io/).

## Dev

- `npm start` is doing watching and serving

### Config

- `metalsmith.js`: This is the Metalsmith build file.

### Serve

Your site is now running at `http://localhost:3000`!

Edit `src/content/index.md`. Save your changes and the browser will update.

## Build 

- `npm run build`

We have here assets which go into an `assets` sub dir in the `./dist` dir.
There is also a `assets-root` dir which contents move direct into the root of the `dist` dir.

### assets-root

These are files which are expected to be in root of this website.

They contain the `faviconHash` which in metalsmith gets added by the build script run. 
So not here!

## Lint

- `npm run lint`

## Deploy

- todo
