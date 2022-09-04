const { findByIdAndUpdate } = require('../models/User.js');
const user = require('../models/User.js');

exports.getPseudo = (req, res) => {
    const profil_id = req.params.id;
    // if (!profil_id) return res.status(400).json({ error: 'No id set in the request !' });
    // findId(profil_id)
    // if (data) return res.status(200).json({ pseudo: data.pseudo });

  
};
exports.getUserInfo = async (req,res)=>{
    const data = await findId(req)
    return res.status(200).json({pseudo : data.pseudo, avatar : data.avatar ,bannerProfil: data.bannerProfil, _id:data._id,job:data.job,localisation:data.localisation});
};
exports.updateBanner = (req,res,next) => {
    noDataReceive(req,res);
    user.findByIdAndUpdate(req._id, {bannerProfil: req.file.filename},(err,doc,res)=>{
        if(err) return console.log(err);
        next();
    })
};
exports.updateAvatar = (req,res,next)=>{
    noDataReceive(req,res);
    user.findByIdAndUpdate(req._id, {avatar: req.file.filename},(err,doc,res)=>{
            if(err) return console.log(err);
            next();
    })
};
exports.udpateUserInfo = (req,res)=>{
    let data = {};
    if(req.body.pseudo) data.pseudo = req.body.pseudo
    if(req.body.job) data.job = req.body.job
    if(req.body.localisation) data.localisation = req.body.localisation

    user.findByIdAndUpdate(req._id,data,(doc,data)=>{
        res.status(200).json()
    })
}
exports.followUser = (req,res)=>{
    console.log('ici');
    user.findById(req._id,(doc,data)=>{
        if(data.followedUser.indexOf(req.params.id) != -1) return res.status(401).json({error: "User already in your friend list !"})

        let update ={};
        update.$push = {followedUser:req.params.id}
        user.findByIdAndUpdate(req._id, update,(err,data)=>{
            if(err) console.log(err);
            console.log(data);
            res.status(200).json("succes")        
        })
    })
}

function noDataReceive(req,res){
    if( !req.filename) return res.status(401).json({error: "No photo received"});
};
async function findId(req){
    return new Promise(resolve => {
        user.findById(req.params.id, (err, data) => {
            if (err) return res.status(500).json({ error: 'Error when findById !' });
            resolve(data);
        });
    });
};