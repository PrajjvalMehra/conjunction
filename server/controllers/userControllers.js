const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Please Enter A User Name");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const checkUser = await User.findOne({ username });

    if (!checkUser) {
        res.status(400);
        throw new Error("User does not exist");
    } else {
        res.status(200).json({
            _id: checkUser._id,
            username: checkUser.username,
        });
    }
});

module.exports = { registerUser, loginUser };