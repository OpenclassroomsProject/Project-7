/* eslint-disable semi */
/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // @ts-ignore
    const userId = decodeToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      req._id = userId;
      req.pseudo = decodeToken.pseudo
      // @ts-ignore
      req.userFolder = path.join(__dirname, `./../images/${userId}`);
      // @ts-ignore
      // @ts-ignore
      req.admin = decodeToken.admin || false;
      next();
    }
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ error: 'Auth error!' });
    // if (!CallbackError) return;
    // return CallbackError();
  }
};
