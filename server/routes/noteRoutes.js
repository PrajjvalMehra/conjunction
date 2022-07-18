const express = require("express");
const { createNote, notesList } = require("../controllers/noteControllers");

const router = express.Router();

router.post("/create", createNote);
router.post("/list", notesList);

module.exports = router;
