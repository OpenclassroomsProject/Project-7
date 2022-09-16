/* eslint-disable semi */
const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const ConversationSchema = new mongoose.Schema({
  startByID: { type: String, required: true },
  recipientID: { type: String, required: true },
  date: { type: String, default: () => Date.now() },

  messages: { type: [Object] },
});

// PostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Conversation', ConversationSchema);
