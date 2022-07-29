const express = require('express');
const router = express.Router();
let multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');
const postCrtl = require('./../controllers/post');

const detectObj = require('../middleware/detectObj');
const valid_Id = require('../middleware/valid_Id');

router.get('/', postCrtl.getAll);
router.get('/:id', auth, valid_Id, postCrtl.getById);
router.get('/like/:id', auth, valid_Id, postCrtl.like);
router.get('/delete/:id', auth, valid_Id, postCrtl.delete);

router.post('/create', auth, multer.single('file'), postCrtl.create);
// router.post('/', auth, multer.single('image'),detectObj, saucesCtrl.create);
// router.get('/:_id', auth, saucesCtrl.getOne);
// router.delete('/:_id', auth, saucesCtrl.delete);
// router.put('/:_id', auth,multer.single('image'),detectObj, saucesCtrl.modify)

module.exports = router;
