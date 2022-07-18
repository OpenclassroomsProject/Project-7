const express = require('express');
const router = express.Router();
let multer = require('../middleware/multer-config');



const auth = require('../middleware/auth');
const postCrtl = require('./../controllers/post')

const detectObj = require('../middleware/detectObj');

router.get('/',auth, postCrtl.getAll)
router.post('/create', auth ,multer.single('file'), postCrtl.create );
// router.post('/', auth, multer.single('image'),detectObj, saucesCtrl.create);
// router.get('/:_id', auth, saucesCtrl.getOne);
// router.post('/:_id/like', auth, detectObj, saucesCtrl.like);
// router.delete('/:_id', auth, saucesCtrl.delete);
// router.put('/:_id', auth,multer.single('image'),detectObj, saucesCtrl.modify)





module.exports = router;