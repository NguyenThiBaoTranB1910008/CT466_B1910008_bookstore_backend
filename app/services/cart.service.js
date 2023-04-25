const db = require("../models/index.js")
const { Op } = require("sequelize");

exports.create = (newCart, result) => {
  db.cart.create(
    newCart
  ).then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};
  
exports.getAll = (result) => {
  db.cart.findAll().then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.findById = (id,user, result) => {
  db.cart.findAll({
    where: { 
      idbook: id,
      user: user
    },
  }).then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.findByName = (name, result) => {
  db.cart.findAll({
    where: { user: name },
  }).then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.updateById = (id, cart, result) => {
  db.cart.update( cart, {
    where: {
      id: id
    }
  })
  .then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.remove = (id, result) => {
  db.cart.destroy({
    where: { id: id},
  }).then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.removeAll =(name,result) => {
  db.cart.destroy({
    where: { user: name}
  }).then(function(cart) {
    result(null, cart);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

