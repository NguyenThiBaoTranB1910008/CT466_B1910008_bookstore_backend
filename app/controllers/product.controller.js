// const ApiError = require("../api-error");
const ProductModel = require("../services/product.service");
// const MongoDB = require("../utils/mysql.util");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const productModel = new ProductModel({
      title : req.body.title,
      author : req.body.author,
      imageUrl : req.body.imageUrl,
      price : req.body.price,
      category : req.body.category,
      page: req.body.page,
      quantity: req.body.quantity,
      brand : req.body.brand,
      language : req.body.language,
      releaseDate: req.body.releaseDate,
      description : req.body.description
    });
  
    // Save Tutorial in the database
    ProductModel.create(productModel, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product"
        });
      else res.send(data);
    });
  };

exports.findAll = async (req , res, next) =>{
    const title = req.query.title;

    ProductModel.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
  ProductModel.findById(req.params.id, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};

exports.findByFilter= (req, res) => {
  ProductModel.findByFilter(req, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};

exports.getLimit= (req, res) => {
  ProductModel.getLimit(req, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};

exports.order= (req, res) => {
  ProductModel.order(req.body.id, req.body.quantity, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while order products."
        });
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
  ProductModel.updateById(
      req.params.id,
      new ProductModel(req.body),
      (err, data) => {
        if (err) {
            // console.log("error");
            if (err.kind === "not_found") {
              res.status(404).send({
              message: `Not found product with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating product with id " + req.params.id
            });
          }
        } else res.send(data);
      }
      );
    };
    
exports.uploadFile = (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.photo;
  myFile.mv(`${__dirname}/../../public/images/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
  })
  var fs = require('fs');
  var filePath = `${__dirname}/../../public/images/${req.body.oldImage}`; 
  // console.log(filePath)
  if(req.body.oldImage != "")
    fs.unlinkSync(filePath);
};
      //  mv() method places the file inside public directory

exports.delete = (req, res) => {
    ProductModel.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete product with id " + req.params.id
          });
        }
      } else res.send({ message: `Product was deleted successfully!` });
    });
};
  
  // Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    ProductModel.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all products."
        });
      else res.send({ message: `All Product were deleted successfully!` });
    });
};