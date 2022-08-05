const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = require('./../middleware/auth');

exports.signIn = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                ...req.body,
            });
            user.password = hash;
            console.log(user);
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
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    res.status(200).json({ avatar: user.avatar, pseudo: user.pseudo, userId: user._id, JWT: createJWT(user), admin: user.admin });
                })
                .catch((error) => res.status(500).send({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.verifyJWT = (req, res) => {
    auth(req, res, () => {
        // console.log(req);
        res.status(200).json({ msg: 'Successfully login !', _id: req._id, pseudo: req.pseudo, avatar: req.avatar, admin: req.admin });
    });
};
function createJWT(data) {
    return jwt.sign({ userId: data._id, pseudo: data.pseudo, avatar: data.avatar, admin: data.admin }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
}
