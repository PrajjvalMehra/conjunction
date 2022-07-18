const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    username: {type: String, required: true},

});

const User = mongoose.model("User", userModel);

module.exports = User;