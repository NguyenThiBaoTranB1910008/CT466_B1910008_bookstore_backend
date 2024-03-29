const express = require ("express");
const cart = require ("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(cart.findAll)
    .post(cart.create)

router.route("/order/:id")
    .delete(cart.deleteAll);

router.route("/:id")
    .post(cart.findById)
    .put(cart.update)
    .delete(cart.delete);

router.route("/get/:id")
    .get(cart.findByName)

module.exports = router;
    
