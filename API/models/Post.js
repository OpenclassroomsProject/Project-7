const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PostSchema = mongoose.Schema({
    createBy: { type: String, required: true },
    date: {type :String, default: () => Date.now()},
    title: { type: String, required: true },
    textArea: { type: String, required: true },
    imagesUrl: { type: [String], required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

PostSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('Post', PostSchema);


