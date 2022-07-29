const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PostSchema = new mongoose.Schema({
    createBy: { type: String, required: true },
    createByPseudo: { type: String, required: true },
    date: { type: String, default: () => Date.now() },
    textArea: { type: String, required: true },
    imagesUrl: { type: [String], required: false },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

PostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', PostSchema);
