// if (!objectId.isValid(req.params.id)
const objectId = require('mongodb').ObjectId;

module.exports = (req, res, next) => {
  if (req.params.id && objectId.isValid(req.params.id)) {
    return next();
  }
  res.status(404).json({ error: 'Params is not valid ! ' });
};
