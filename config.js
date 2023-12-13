const distDir = __dirname + '/dist/';
const srcAssetsDir = __dirname + '/src/assets/';
const srcLayoutsDir = __dirname + '/src/layouts/';
const cssFile = srcAssetsDir + 'style.css';

exports.distDir = distDir;
exports.cssFile = cssFile;
exports.criticalCssPath = srcLayoutsDir + 'critical.css';

exports.browserSyncPort = 3030; // 3030 to not disturb may open 3000 port
