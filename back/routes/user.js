const express = require('express')
const router = express.Router()

const  {
    createNewUser,
} = require('../controllers/user.js')

router.post("/add", createNewUser);

module.exports = router;