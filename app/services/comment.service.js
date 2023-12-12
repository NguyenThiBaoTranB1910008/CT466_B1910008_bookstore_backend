const db = require("../models/index.js")

exports.create = (comment, result) => {
  db.comment.create(
    comment
  ).then(function(comment) {
    result(null, comment);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.getCommentByIdBook = (idbook, result) => {
  db.comment.findAll({
    where: { idBook: idbook},
    include: [
      {
          association: "user_comment",
          attributes: ["fullname"]
      }
  ]
  }).then(function(comment) {
    result(null, comment);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.getCommentByIdUser = (id, result) => {
  db.comment.findAll({
    where: { idUser: id},
    include: [
      {
        association: "product_comment",
        attributes: ["title"]
      },
      {
          association: "user_comment",
          attributes: ["accname"]
      },
  ]
  }).then(function(comment) {
    result(null, comment);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.getAll = (req, result) => {
  db.comment.findAll({
    include: [
      {
        association: "product_comment",
        attributes: ["title"]
      },
      {
          association: "user_comment",
          attributes: ["accname"]
      },
  ]
  }
  ).then(function(comment) {
    result(null, comment);
	}).catch((err)=>{
    console.log("error: ", err);
    result(null, err);
    return;
  })
};

exports.remove = (id, result) => {
  db.comment.destroy({
    where: {
      id: id
    }})
    .then(function(comment) {
      result(null, comment);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};
