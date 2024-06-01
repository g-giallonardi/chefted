const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    name: String ,
    firstname: String,
    password: String,
    house:{
        allergy : [String],
        habit: [String],
        person: Number
    },
    openAI:{
        threadID: String,
        assistantID: String
    }
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;