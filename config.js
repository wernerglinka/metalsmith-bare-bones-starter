const srcDir = __dirname + '/src/';
const distDir = __dirname + '/dist/';
const srcAssetsDir = srcDir + 'assets/';
const srcAssetsRootDir = srcDir + 'assets-root/';
const srcLayoutsDir = srcDir + 'layouts/';
const cssFile = srcAssetsDir + 'style.css';

exports.srcDir = srcDir;
exports.distDir = distDir;
exports.srcAssetsDir = srcAssetsDir;
exports.srcAssetsRootDir = srcAssetsRootDir;
exports.cssFile = cssFile;
exports.criticalCssPath = srcLayoutsDir + 'critical.css';

exports.browserSyncPort = 3030; // 3030 to not disturb may open 3000 port
