const { json } = require('body-parser');
const { findByIdAndUpdate } = require('../models/User.js');
const user = require('../models/User.js');
const postCrtl = require('./post.js');
exports.preview = async (req,res)=> {
    const profil = await user.findById(req.params.id)

    if(!profil) return res.status(404),json({err: "Profil not found !"})
    const {avatar, bannerProfil,job,localisation, pseudo} = profil;

    const Avatar = customPathAvatarIfDefault(avatar, req.params.id )
    const profilInfo = {pseudo : pseudo,avatar: Avatar , bannerProfil: bannerProfil, job:job ,localisation: localisation}

    const ObjResponse= {profilInfo:profilInfo,post:false}

    if(req._id === String(profil._id)) ObjResponse.profilInfo.editProfil = true;
    
    return postCrtl.getAllPostByUserId(req,res,()=>{
        ObjResponse.post= req.result
        ObjResponse.profilInfo._id= req.params.id;
        return res.status(200).json(ObjResponse)
    });
}
exports.getPseudo = (req, res) => {
    const profil_id = req.params.id;
    // console.log(profil_id);
    // if (!profil_id) return res.status(400).json({ error: 'No id set in the request !' });
    // findId(profil_id)
    // if (data) return res.status(200).json({ pseudo: data.pseudo });

  
};
exports.getPseudo_and_Avatar = (req, res, next) => {
    const profil_id = req.params.id;
    // console.log(profil_id);
    user.findById(profil_id, (err, userData)=>{
        if(err) return res.status(500).json({err: err})
        if(!userData) return res.status(404).json({err: 'User not found !'})
        
        if(userData.avatar === "default.png") userData.avatar = userData.avatar
        const Avatar = userData.avatar === "default.png" ? "/images/"+userData.avatar : '/images/'+req._id+'/assets/'+userData.avatar;
        req.result= {pseudo: userData.pseudo, avatar: Avatar};
        if(next) return next();
        res.status(200).json(req.result)
    })
    
    // if (!profil_id) return res.status(400).json({ error: 'No id set in the request !' });
    // findId(profil_id)
    // if (data) return res.status(200).json({ pseudo: data.pseudo });

  
};
exports.getUserInfo = async (req,res)=>{
    user.findById(req.params.id, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error when findById !' });
        if(!data) return  res.status(404).json({error: "User not found !"})

        res.status(200).json(data);
    });
    // res.status(200).json({pseudo : data.pseudo, avatar : data.avatar ,bannerProfil: data.bannerProfil, _id:data._id,job:data.job,localisation:data.localisation, followedUser:data.followedUser, conversation: data.conversation});
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
    user.findById(req._id,(doc,data)=>{
        if(data.followedUser.indexOf(req.params.id) != -1) return res.status(401).json({error: "User already in your friend list !"})

        let update ={};
        update.$push = {followedUser:req.params.id}
        user.findByIdAndUpdate(req._id, update,(err,data)=>{
            if(err) console.log(err);
            res.status(200).json("succes")        
        })
    })
}
exports.unFollowUser = (req,res)=>{
    user.findById(req._id,(doc,data)=>{
        if(data.followedUser.indexOf(req.params.id) === -1) return res.status(200).json({error: "This user is not in your followed users list !"})

        let update ={};

        update.$pull = {followedUser:req.params.id}
        user.findByIdAndUpdate(req._id, update,(err,data)=>{
            if(err) console.log(err);
            res.status(200).json("succes")        
        })
    })
}


function noDataReceive(req,res){
    if( !req.filename) return res.status(401).json({error: "No photo received"});
};
function customPathAvatarIfDefault(avatarName, idAvatar){
    const Avatar = avatarName === "default.png" ? "/images/"+avatarName : '/images/'+idAvatar+'/assets/'+avatarName;
    return Avatar;
}   
