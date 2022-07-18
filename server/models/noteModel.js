const mongoose = require("mongoose");

const noteModel = new mongoose.Schema({
    title: {type: String, required: true, default: "Untitled"},
    content: {type: String, default: "Type your note here"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User", default: []}],
})

const Note = mongoose.model("Note", noteModel);

module.exports = Note;