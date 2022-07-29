const express = require('express');
const router = express.Router();
const profilCrtl = require('../controllers/profil');

// const detectObj = require('../middleware/detectObj');

const auth = require('../middleware/auth');

router.get('/pseudo/:_id', profilCrtl.getPseudo);
// router.post('/',userCtrl.verifyJWT );
// router.post('/Login', userCtrl.login);
// router.post('/SignIn', userCtrl.signIn);

module.exports = router;
