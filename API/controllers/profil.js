const user = require('../models/User.js');

exports.getPseudo = (req, res) => {
    const profil_id = req.params._id;
    if (!profil_id) return res.status(400).json({ error: 'No id set in the request !' });

    user.findById(profil_id, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error when findById !' });
        if (data) return res.status(200).json({ pseudo: data.pseudo });
    });
};
