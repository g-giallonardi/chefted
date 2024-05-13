const express = require('express')
const router = express.Router()

const  {
    changeMeal,
    changeMenu,
} = require('../controllers/meal.js')

router.post("/change", changeMeal);
router.post("/changeMenu", changeMenu);
module.exports = router;