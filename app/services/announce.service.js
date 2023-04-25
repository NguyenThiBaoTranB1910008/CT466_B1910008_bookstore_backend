const db = require("../models/index.js")
const { Op } = require("sequelize");

  
exports.create = (announment, result) => {
  db.announce.create(
    announment
  ).then(function(announce) {
    result(null, announce);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};
  
exports.findByName = (name, result) => {
  db.announce.findAll({
    where: { 
      user: name
    },
  }).then(function(announce) {
    result(null, announce);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.seen = (name, result) => {
  db.announce.update( {status: 1}, {
    where: {
      user: name
    }
  })
  .then(function(announce) {
    result(null, announce);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.newNotify = (name, result) => {
  db.announce.findAll({
    where: { 
    user: name,
    status: 0,
    },
  }).then(function(announce) {
    result(null, announce);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};
