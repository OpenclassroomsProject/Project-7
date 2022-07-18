const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = require('./../middleware/auth')


exports.signIn = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            const user = new User({
                ...req.body
            });
            user.password = hash;
            console.log(user);
            user.save()
                .then(() => res.status(201).json({ message: 'Signup succes !' , JWT: createJWT(user)}))
                .catch(err => { res.status(400).json({ err }) });

        })
        .catch(err => res.status(500).json({ err }));
};

exports.login = (req, res) => {
    // console.log(req);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }


                    res.status(200).json({
                        userId: user._id,
                        JWT: createJWT(user)
                    });
                })
                .catch(error => res.status(500).send({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.verifyJWT= (req,res)=>{
    auth(req,res,()=>{
        return res.status(200).json({msg: 'Successfully login !'})
    });
}
function createJWT(data){
    return jwt.sign({ userId: data._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
}