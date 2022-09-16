/* eslint-disable semi */

const multer = require('multer');
const fs = require('fs');
// const path = require('path')
// const { dirname} = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const UserFolder = req.userFolder + '/tmp';
    try {
      if (!fs.existsSync(UserFolder)) {
        console.log('création du fichier');
        fs.mkdirSync(UserFolder, { recursive: true });
        fs.mkdirSync(req.userFolder+'/assets');

      }
    } catch (err) {
      console.error(err);
    }
    callback(null, UserFolder);
  },
  filename: (req, file, callback) => {
    // console.log(file);
    // const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    req.filename = Date.now() + '.' + extension;

    callback(null, req.filename);
  }
});

module.exports = multer({ storage });
