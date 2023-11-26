const express = require ("express");
const address = require ("../controllers/address.controller");

const router = express.Router();

router.route("/")
    .post(address.create)

router.route("/:id")
    .get(address.findById)
    .delete(address.delete)

module.exports = router;
    
