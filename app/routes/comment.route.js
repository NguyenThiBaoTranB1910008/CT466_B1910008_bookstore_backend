const express = require ("express");
const comment = require ("../controllers/comment.controller");
const router = express.Router();

router.route("/")
    .post(comment.create)
    .get(comment.getAll)

router.route("/user/:id")
    .get(comment.findByIdUser)

router.route("/:idbook")
    .get(comment.findByIdBook)
    .delete(comment.delete)

router.route("/upload")
    .post(comment.uploadFile)

module.exports = router;
    
