const express = require ("express");
const user = require ("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(user.findAll)
    .post(user.create)

router.route("/filter")
    .post(user.findByFilter)

router.route("/:id")
    .delete(user.delete)
    .post(user.updateAdmin)
    .put(user.update)


router.route("/check/:accname")
    .get(user.checkAccName)
    .post(user.loginCheck)

router.route("/:accname")
    .get(user.findByAccName)


module.exports = router;
    
