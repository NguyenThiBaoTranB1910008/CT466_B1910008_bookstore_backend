const db = require("../models/index.js")
const { Op } = require("sequelize");

exports.create = (newUser, result) => {
  db.user.create(
    newUser
  ).then(function(user) {
    result(null, user);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};
  
exports.getAll = (result) => {
  db.user.findAll().then(function(task) {
    result(null, task);
	}).catch((err)=>{
    console.log("error: ", err);
    result(null, err);
    return;
  })
};

exports.findByAccName = (accname, result) => {
  db.user.findAll({
    where: {
      accname: accname,
    },
  }).then(function(user) {
    if(user.length != 0)
      result(null, user[0]);
    else
      result({ kind: "not_found" }, null);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.findByFilter = (req, result) => {
  let search = req.body.search ? req.body.search : "";
  db.user.findAll({
    where: {
      accname: {[Op.substring] : search},
    }})
    .then(function(user) {
    result(null, user);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.checkAccName = (accname, result) => {
  db.user.findAll({
    where: {
      accname: accname,
    }})
    .then(function(user) {
      result(null, user[0]);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.loginCheck= (accname,pass, result) => {
  db.user.findOne({
    where: {
      accname: accname,
      pass: pass,
    }})
    .then(function(user) {
      result(null, user);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.remove = (id, result) => {
  db.user.destroy({
    where: {
      id: id
    }})
    .then(function(user) {
      result(null, user);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.update = (id, user, result) => {
  db.user.update( user, {
    where: {
      id: id
    }
  })
  .then(function(user) {
    result(null, user);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};
