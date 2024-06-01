const UserModel = require("../database/models/user.model");


const createNewUser = (async (req, res) => {
    const newUserData = req.body

    try {
        const newUserPromise = new UserModel(newUserData)
        res.json(await newUserPromise.save())
    } catch (e){
        //TODO: Manage error status
        res.status(400)
        res.json(e)
    }
})

module.exports = {
    createNewUser,
}