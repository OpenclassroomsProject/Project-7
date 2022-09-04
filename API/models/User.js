const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pseudo: { type: String, default: 'Utilisateur' },
    avatar: { type: String, default: 'default.png' },
    bannerProfil :{type:String , default:false},
    job:{type:String , default:false},
    localisation:{type:String , default:false},
    followedUser: {type: [String] },
    admin: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
