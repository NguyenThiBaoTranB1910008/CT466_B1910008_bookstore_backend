const db = require("../models/index.js")

exports.create = (address, result) => {
  if (address.default_value == 1){
    db.address.update(
      {default_value : 0},
      {where : {idUser : address.idUser}}
    ).then(function(address) {
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    })
  }
  db.address.create(
    address
  ).then(function(address) {
    result(null, address);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.findById = (id, result) => {
  db.address.findAll({
    where: { idUser: id},
    include: [
      {
          association: "user_address",
          attributes: ["fullname","phone"]
      }],
    order: [
        ['default_value', 'DESC']
    ],
  }).then(function(address) {
    result(null, address);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.remove = (id, result) => {
  db.address.destroy({
    where: { id: id},
  }).then(function(address) {
    result(null, address);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};
