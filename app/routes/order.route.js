const express = require ("express");
const order = require ("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .get(order.findAll)
    .post(order.create)

// router.route("/check/:accname")
//     .get(user.checkAccName)

router.route("/confirm")
    .post(order.confirm)

router.route("/detail/:id")
    .get(order.findOrderDetail)

router.route("/getreview")
    .post(order.reviewById)

router.route("/review/:id")
    .get(order.findById)

router.route("/:accname")
    .get(order.findByAcc)

router.route("/filter")
    .post(order.findByFilter)
    
module.exports = router;
    
