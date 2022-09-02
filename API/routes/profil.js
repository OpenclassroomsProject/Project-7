const express = require('express');
const router = express.Router();
const profilCrtl = require('../controllers/profil');
const multer = require('../middleware/multer-config');
// const detectObj = require('../middleware/detectObj');

const auth = require('../middleware/auth');
const valid_Id = require('../middleware/valid_Id');
const move_temp_file = require('../middleware/move_temp_file');

router.get('/:id',valid_Id, profilCrtl.getUserInfo)
router.get('/pseudo/:id', valid_Id, profilCrtl.getPseudo);
router.post('/update/banner',multer.single('banner'), profilCrtl.updateBanner, move_temp_file)
router.post('/update/avatar',multer.single('avatar'), profilCrtl.updateAvatar, move_temp_file)
router.post('/update/bio',profilCrtl.udpateUserInfo)
router.get('/follow/:id',valid_Id,profilCrtl.followUser)
// router.post('/',userCtrl.verifyJWT );
// router.post('/Login', userCtrl.login);
// router.post('/SignIn', userCtrl.signIn);

module.exports = router;
