const express = require('express')
const router = express.Router()

const  {
    sendChatMessage,
} = require('../controllers/chat.js')

router.post("/message", sendChatMessage);

module.exports = router;