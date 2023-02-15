const express = require ("express");
const products = require ("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAll)
    .post(products.create)
    .delete(products.deleteAll);

router.route("/filter")
        .post(products.findByFilter)

router.route("/new")
        .get(products.getLimit)

router.route("/upload")
        .post(products.uploadFile)
            
router.route("/:id")
    .get(products.findById)
    .put(products.update)
    .delete(products.delete);


module.exports = router;
    
