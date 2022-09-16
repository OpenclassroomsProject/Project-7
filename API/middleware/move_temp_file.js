/* eslint-disable semi */
/* eslint-disable no-throw-literal */

const fs = require('fs');

module.exports = (req, res) => {
  const newPath = req.userFolder + '/assets/' + req.file.filename
  const tmpPath = req.userFolder + '/tmp/' + req.filename;

  fs.access(tmpPath, fs.F_OK, (err) => {
    if (err) return console.error(err);

    console.log('file exist in tmp file');

    fs.rename(tmpPath, newPath, function (err) {
      if(err) console.log(err);
      // if (err) throw err;
      res.status(200).json({message: 'Image succesfully update ! ', imageName: req.filename})
    });
    //file exists
  });
};
