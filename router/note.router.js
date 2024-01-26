const express = require("express");
const note_router = express.Router();
const noteController = require("../controller/note.controller");

note_router.get("/", noteController.viewHome);
note_router.get("/express", noteController.viewExpress);
note_router.get("/http", noteController.viewHTTP);

module.exports = note_router;