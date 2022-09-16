const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = require('./../middleware/auth');
const { getUserInfo } = require('./profil');


exports.signIn = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                ...req.body,
            });
            user.password = hash;
            // console.log(user);
            user.save()
                .then(() => res.status(201).json({ message: 'Signup succes !', JWT: createJWT(user) }))
                .catch((err) => {
                    res.status(400).json({ err });
                });
        })
        .catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res) => {
    // console.log(req);
    let filterQuery;
    // if(regex) filterQuery ={email: req.body.email}
    // else filterQuery= {pseudo: req.body.pseudo}
    
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    res.status(200).json({ avatar: user.avatar,bannerProfil: user.bannerProfil, pseudo: user.pseudo, userId: user._id, JWT: createJWT(user), admin: user.admin, followedUser: user.followedUser, conversation: user.conversation });
                })
                .catch((error) => res.status(500).send({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.verifyJWT = async (req, res) => {
 

    User.findById(req._id, (err, data) => {
        if(data){
            if (err) return res.status(500).json({ error: 'Error when findById !' });
            let tmp = {...data}
            delete tmp._doc.password;
            tmp._doc.avatar = tmp._doc.avatar === "default.png" ? "/images/"+tmp._doc.avatar : '/images/'+req._id+'/assets/'+tmp._doc.avatar;
            return res.status(200).json(tmp._doc);
        }
        return res.status(404).json({error: 'User not found with jwt token !'});
    });
    // console.log(tmp._doc);



    // auth(req, res, () => {
    //     req.params.id = req._id;
    //     console.log(req );
    //     // getUserInfo(req,res)
    // });
};
function createJWT(data) {
    return jwt.sign({ userId: data._id,admin: data.admin, pseudo: data.pseudo }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
}
// const ServerURL = req.protocol + '://' + req.get('host');