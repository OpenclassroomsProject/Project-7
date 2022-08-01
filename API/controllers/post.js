/* eslint-disable semi */
// const { findByIdAndUpdate } = require('../models/Post.js');

const Post = require('../models/Post.js');
const objectId = require('mongodb').ObjectId;

exports.create = (req, res, next) => {
  console.log("Création d'un post");

  const newPost = new Post({ ...req.body });
  newPost.imagesUrl.push(req.filename);
  newPost.createBy = req._id;
  newPost.createByPseudo = req.pseudo;
  newPost
    .save()
    .then(() => {
      if (req.filename) {
        next();
      }
      res.status(201).json({ message: 'Post succeffuly upload !' });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.getAll = (req, res) => {
  const id = req._id || 'visitor';
  console.log('Receive request get all post by => ' + id);

  const allPost = Post.find({ published: true }).sort({ date: -1 }).limit(20);
  allPost.exec(function (err, posts) {
    if (err) return console.log(err);
    res.status(200).json(posts);
  });
};

exports.getById = (req, res) => {
  console.log('Request get post by _id receive by => ' + req._id);

  if (!objectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalide id !' });
  }

  Post.findById(req.params.id).then((data) => {
    if (!data) return res.status(400).json({ error: 'Post not Found' });
    res.status(200).json(data);
  });
};
exports.like = (req, res) => {
  const userId = req._id;
  const postId = req.params.id;
  //   console.log(req);
  Post.findById(postId, (err, data) => {
    console.log('Request post like receiver by => ' + req._id);

    if (err) return res.status(500).json(err);
    // eslint-disable-next-line prefer-const
    let update = {};
    // let likes = data.likes;
    let message;
    if (data.usersLiked.indexOf(userId) !== -1) {
      update.$inc = { likes: -1 };
      update.$pull = { usersLiked: userId };
      message = 'Like succesfully remove !';
    } else {
      update.$inc = { likes: 1 };
      update.$push = { usersLiked: userId };
      message = 'Like succesfully add !';
    }

    Post.findByIdAndUpdate(postId, update, function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({ message: message });
      }
    });
  });
};
exports.delete = (req, res) => {
  console.log(req.params.id);
  Post.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return res.status(200).json(err);
    res.status(200).json({ ok: true, message: 'Post succesfullly remove !' });
  });
};
exports.edit = (req, res, next) => {
  const postID = req.params.id;
  const description = req.body.description;
  const update = {};
  if (description) {
    update.description = description;
    console.log('moddification descritpion');
  }
  if (req.filename) {
    update.imagesUrl = req.filename;
    console.log('moddification image');
  }
  console.log(update);
  Post.findByIdAndUpdate(postID, update, false, (err, result) => {
    if (err) res.status(400).json(err);
    req.post = result;
    if (req.filename) {
      next();
    } else {
      res.status(200).json({ message: 'Description succesfully update !' });
    }
  });
  // console.log(req.userFolder + '/temp/');
};
