/* eslint-disable semi */
// const { findByIdAndUpdate } = require('../models/Post.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const userCrtl = require('./profil.js');
const objectId = require('mongodb').ObjectId;

exports.create = (req, res, next) => {
  // console.log("Création d'un post");
  const newPost = new Post({ ...req.body });
  newPost.imagesUrl.push(req.filename);
  newPost.createBy = req._id;
  newPost.createByPseudo = req.pseudo;

  newPost
    .save()
    .then(() => {
      if (req.filename) {
       return next();
      }
      res.status(201).json({ message: 'Post succeffuly upload !' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};

exports.getAll = async(req, res) => {
  const allPost = await Post.find().sort({ date: -1 }).limit(20);
  let tmpAllPost = []
 allPost.forEach((e,index) => {
    req.params.id = e._doc.createBy;

    userCrtl.getPseudo_and_Avatar(req,res,()=>{
      tmpAllPost.push({...e._doc, avatar:req.result.avatar, createByPseudo:req.result.pseudo})
      if(index+1 === allPost.length){
        res.status(200).json(tmpAllPost)
      }
    })
  })
};

exports.getById = (req, res) => {
  // console.log('Request get post by _id receive by => ' + req._id);

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
    // console.log('Request post like receiver by => ' + req._id);

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
  // console.log(req.params.id);
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
    // console.log('moddification descritpion');
  }
  if (req.filename) {
    update.imagesUrl = req.filename;
    // console.log('moddification image');
  }
  // console.log(update);

  Post.findByIdAndUpdate(postID, update, false, (err, result) => {
    if (err) res.status(400).json(err);
    req.post = result;
    if (req.filename) {
      next();
    } else {
      res.status(200).json({ message: 'Description succesfully update !' });
    }
  });
};

exports.getAllPostByUserId = async (req,res,next)=>{
  const allPost = await Post.find({createBy:req.params.id}).sort({ date: -1 }).limit(20);
  // console.log(allPost);
  req.result = allPost
  if(next)return next()
  ExecSearchPost_and_fetchUserAvatarWhoCreatedPost(allPost, res)
  // Post.find({createBy:req.params.id}, ( err,data)=>{
  // })
  
}
function ExecSearchPost_and_fetchUserAvatarWhoCreatedPost(find, res){
  find.exec((err,data)=>{
    if(data.length === 0) return res.status(200).json(false)

    let Post = [];  
    const maxForeach = data.length;

    data.forEach((element, index) => {

      User.findById(element.createBy)
        .then(FindUser=>{ 
          if(!FindUser) return res.status(405).json()
          const pathAvatar = FindUser.avatar === 'default.png' ? 'default.png' : element.createBy+'/'+FindUser.avatar;
          let tmp = {...element}
              tmp._doc.avatar = '/images/' +pathAvatar;
              tmp._doc.createByPseudo = FindUser.pseudo;

          Post.push(tmp._doc)
          
          if(Post.length === maxForeach) return res.status(200).json(Post)
        })
      });
  })
}

