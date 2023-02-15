const UserModel = require("../services/user.service");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const userModel = new UserModel({
      accname: req.body.accname,
      fullname : req.body.fullname,
      pass : req.body.pass,
    });
  
    // Save Tutorial in the database
UserModel.create(userModel, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user"
        });
      else res.send(data);
    });
  };

exports.findAll = async (req , res, next) =>{

    UserModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users"
            });
        else res.send(data);
    });
};

exports.findByAccName = (req, res) => {
  UserModel.findByAccName(req.params.accname, (err, data) => {
    if (err)
        res.send(false);
    else res.send(data);
  });
};

exports.findByFilter= (req, res) => {
  // console.log( "hi")
  UserModel.findByFilter(req, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving users."
        });
    else res.send(data);
  });
};

exports.checkAccName = (req, res) => {
    UserModel.checkAccName(req.params.accname, (err, data) => {
      if (err)
          res.send(false);
      else res.send(data);
    });
  };

exports.loginCheck = (req, res) => {
    UserModel.loginCheck(req.body.accname,req.body.pass, (err, data) => {
      if (err)
          res.send(false);
      else res.send(data);
    });
  };

exports.delete = (req, res) => {
    UserModel.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete cartuser with id " + req.params.id
          });
        }
      } else res.send({ message: `User item was deleted successfully!` });
    });
};

exports.updateAdmin = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  UserModel.updateAdmin(
    req.body.id, req.body.isadmin,
    (err, data) => {
      if (err) {
        console.log("error");
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user item with id ${req.params.id}.`
          });
        } else {
          console.log("500")
          res.status(500).send({
            message: "Error updating quality of cart item with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
UserModel.update(
  req.params.id,
    new UserModel(req.body),
    (err, data) => {
      if (err) {
          // console.log("error");
          if (err.kind === "not_found") {
            res.status(404).send({
            message: `Not found user with name ${req.params.accname}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.accname
          });
        }
      } else res.send(data);
    }
    );
  };