const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

const createNote = asyncHandler(async (req, res) => {
    const { title, username } = req.body;
    
    if (!title || !username) {
        res.status(400);
        throw new Error("Please enter a title and username");
    }
    
    const createdBy = await User.findOne({username});

    const note = await Note.create({ title, createdBy});
    note.users.push(createdBy);
    
    if (note) {
  
        res.status(201).json({
            _id: note._id,
            title: note.title,
            content: note.content,
            createdBy: createdBy.username,
            users: note.users,
        });
    }
})

const notesList = asyncHandler(async (req, res) => {
    const {username} = req.body;

    const user = await User.findOne({username});
    const notes = await Note.find(
    {
       users:{ $elemMatch: { $eq: user._id } }
    }
).populate("createdBy").populate("users");
    if (notes) {
        res.status(200).json(notes);
    }
    
})

module.exports =  {createNote, notesList};