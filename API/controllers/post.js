const PostSchema = require('../models/Post.js');


exports.create = (req,res)=>{
    console.log( "Création d'un post");
   
    let newPost = new PostSchema({...req.body})
    newPost.imagesUrl.push(req.filename)
    newPost.createBy = req._id;
    newPost.save()
    .then(() => res.status(201).json({ message: 'Post succeffuly upload !' }))
    .catch(err => { res.status(400).json({ err }) });
}

exports.getAll= (req,res)=>{

    console.log('Receive request get all post by =>' + req._id);

    let allPost = PostSchema.find({published: true}).sort({'date': -1}).limit(20);
    allPost.exec(function(err, posts) {
        if(err)return console.log(err);
        res.status(200).json(posts)
    });
}

