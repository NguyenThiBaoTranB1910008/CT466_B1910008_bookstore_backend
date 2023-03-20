const CartModel = require("../services/cart.service");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const cartModel = new CartModel({
      user: req.body.user,
      idbook: req.body.idbook,
      title : req.body.title,
      imgUrl : req.body.imgUrl,
      price : req.body.price,
      quantity: req.body.quantity,
    });

  
    // Save Tutorial in the database
CartModel.create(cartModel, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cart"
        });
      else res.send(data);
    });
  };

exports.findAll = async (req , res, next) =>{
    const title = req.query.title;

    CartModel.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
  CartModel.findById(req.params.id,req.body.user, (err, data) => {
    if (err)
        res.send(false);
    else res.send(data);
  });
};

exports.findByName = (req, res) => {
  CartModel.findByName(req.params.name, (err, data) => {
    if (err)
        res.send("error");
    else res.send(data);
  });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
  CartModel.updateById(
    req.params.id,
      new CartModel(req.body),
      (err, data) => {
        if (err) {
            // console.log("error");
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found cart item with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating quantity of cart item with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
};
  
exports.delete = (req, res) => {
    CartModel.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found cart with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete cart with id " + req.params.id
          });
        }
      } else res.send({ message: `Cart item was deleted successfully!` });
    });
};
  
  // Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    CartModel.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cart."
        });
      else res.send({ message: `All cart were deleted successfully!` });
    });
};