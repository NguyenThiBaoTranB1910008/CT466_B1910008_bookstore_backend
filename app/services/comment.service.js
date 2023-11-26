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
