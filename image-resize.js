const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const dir = process.argv[3];
const dist = process.argv[4];
const size = parseInt(process.argv[5]);
const suffix = process.argv[6];

/**
 * used in gulp for resizing images to assets build dir
 *
 * @param {string} dir source dir
 * @param {string} dist destination dir. assets dir
 * @param {number} size image cropping size in px
 * @param {string} suffix addition to image name
 */
glob(dir, function (err, files) {
  if (err != null) { throw err; }
  fs.mkdirSync(dist, { recursive: true });
  files.forEach(function(inputFile) {
    sharp(inputFile)
      .resize(size, size, {fit: "inside"})
      .webp({quality: 77, force: true })
      .toFile(path.join(dist, path.basename(inputFile, path.extname(inputFile))+suffix+".webp"), (err, info) => {
        if(err === null){
          console.log("successfully compressed"+inputFile+" to "+info.format+" in size "+info.width+"px");
        } else { throw err }
      });
  });
});
