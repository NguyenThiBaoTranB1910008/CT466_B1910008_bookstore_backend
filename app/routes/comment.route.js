const express = require ("express");
const comment = require ("../controllers/comment.controller");
const router = express.Router();

router.route("/")
    .post(comment.create)

router.route("/:idbook")
    .get(comment.findByIdBook)

router.route("/upload")
    .post(comment.uploadFile)

module.exports = router;
    
