const express = require('express');
const router = express.Router();
const conversationCrtl = require('../controllers/conversation.js');

const valid_Id = require('../middleware/valid_Id');

// router.post('/send/:id',valid_Id, conversationCrtl.send );
// router.get('/' , conversationCrtl.getAllPrivateConversation )
router.get('/:id',valid_Id, conversationCrtl.getAllMessage );
router.get('/preview/:id',valid_Id, conversationCrtl.preview);


module.exports = router;