/* eslint-disable semi */
/* eslint-disable no-throw-literal */

const fs = require('fs');

module.exports = (req, res) => {
  const newPath = req.userFolder + '/' + req.filename;
  const tmpPath = req.userFolder + '/tmp/' + req.filename;
  // if () {

  // fs.mkdirSync(UserFolder, { recursive: true });
  // }
  // while (!fs.existsSync(tmpPath)) {
  //   console.log('wait');
  //   console.log('moove img');
  // }

  // @ts-ignore
  fs.access(tmpPath, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('exist');

    fs.rename(tmpPath, newPath, function (err) {
      if(err) console.log(err);
      // if (err) throw err;
      res.status(200).json({message: 'Image succesfully update ! ', imageName: req.filename})
    });
    //file exists
  });
};
