const express = require ("express");
const announce = require ("../controllers/announce.controller");
const router = express.Router();


router.route("/")
    .post(announce.create)

router.route("/new/:user")
    .get(announce.newNotify)

router.route("/:user")
    .get(announce.findByUser)
    .post(announce.seen)

module.exports = router;
    
