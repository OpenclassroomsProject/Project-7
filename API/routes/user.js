const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const detectObj = require ('../middleware/detectObj')
const auth = require('./../middleware/auth')

router.get('/',auth, userCtrl.verifyJWT );
// router.post('/',userCtrl.verifyJWT );
router.post('/Login', userCtrl.login);
router.post('/SignIn', userCtrl.signIn);

module.exports = router;