const jwt = require('jsonwebtoken');
const path = require('path')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            req._id = userId;
            req.userFolder = path.join(__dirname, `./../images/${userId}`);
            next();
        }
    } catch (error) {
        return res.status(401).json({ error: 'Auth error!' });
        if(!CallbackError) return
        return CallbackError();
    }
}