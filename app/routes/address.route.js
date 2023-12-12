const express = require("express");
const address = require("../controllers/address.controller");

const router = express.Router();

router.route("/")
    .post(address.create)

router.route("/isDefault")
    .get(address.isDefault)

router.route("/:id")
    .get(address.findById)
    .delete(address.delete)
    .post(address.update)

module.exports = router;