/* eslint-disable semi */
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCrtl = require('./../controllers/post');
// eslint-disable-next-line camelcase
const move_temp_files = require('./../middleware/move_temp_file');
// eslint-disable-next-line camelcase
const valid_Id = require('../middleware/valid_Id');

router.get('/', postCrtl.getAll);
router.get('/getAllByUserId/:id',auth,valid_Id, postCrtl.getAllPostByUserId);
router.get('/:id', auth, valid_Id, postCrtl.getById);
router.get('/like/:id', auth, valid_Id, postCrtl.like);
router.delete('/delete/:id', auth, valid_Id, postCrtl.delete);
router.put('/edit/:id', auth, multer.single('file'), postCrtl.edit, move_temp_files);
router.post('/create', auth, multer.single('file'), postCrtl.create, move_temp_files);
// router.post('/', auth, multer.single('image'),detectObj, saucesCtrl.create);
// router.get('/:_id', auth, saucesCtrl.getOne);
// router.delete('/:_id', auth, saucesCtrl.delete);
// router.put('/:_id', auth,multer.single('image'),detectObj, saucesCtrl.modify)

// eslint-disable-next-line semi
module.exports = router;
