const penthouse = require("penthouse")
const fs = require("fs")
const { criticalCssPath, distDir, cssFilePath, browserSyncPort } = require("./config")

module.exports = penthouse({
  url: `http://localhost:${browserSyncPort}/`,
  // url: 'https://andrekelling.de/works',
  css: cssFilePath,
  // pageLoadSkipTimeout: 10000,
  // renderWaitTime: 500,
  // keepLargerMediaQueries: true,
  // type: 'screen',
  // width: 1300,
  // height: 900,
  screenshots: {
    basePath: `${distDir}pageload`, // absolute or relative; excluding file extension
    type: "jpeg", // jpeg or png, png default
    quality: 20 // only applies for jpeg type
  }
}).then((criticalCss) => {
  // use the critical css
  fs.writeFileSync(criticalCssPath, criticalCss)
})
