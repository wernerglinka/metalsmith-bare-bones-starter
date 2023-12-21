const srcDir = `${__dirname}/src/`
const distDir = `${__dirname}/dist/`
const srcAssetsDir = `${srcDir}assets/`
const srcAssetsRootDir = `${srcDir}assets-root/`
const srcLayoutsDir = `${srcDir}layouts/`
const cssFilePath = `${srcAssetsDir}style.css`
const jsFilePath = `${srcAssetsDir}main.js`

exports.srcDir = srcDir
exports.distDir = distDir
exports.srcAssetsDir = srcAssetsDir
exports.srcAssetsRootDir = srcAssetsRootDir
exports.cssFilePath = cssFilePath
exports.jsFilePath = jsFilePath
exports.srcLayoutsDir = srcLayoutsDir
exports.svgSymbolsPath = `${srcLayoutsDir}svg-symbols.svg`
exports.criticalCssPath = `${srcLayoutsDir}critical.css`

exports.browserSyncPort = 3030 // 3030 to not disturb may open 3000 port
