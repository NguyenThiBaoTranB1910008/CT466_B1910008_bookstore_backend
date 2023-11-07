const CommentModel = require("../services/comment.service");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const commentModel = {
      idBook: req.body.idBook,
      idUser: req.body.idUser,
      ratting : req.body.ratting,
      comment : req.body.comment,
      dateCmt : req.body.dateCmt,
      img1 : req.body.img1,
      img2 : req.body.img2,
      img3 : req.body.img3,
      img4 : req.body.img4
    };
  
    // Save Tutorial in the database
    CommentModel.create(commentModel, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the comment"
            });
        else res.send(data);
        });
};

exports.findByIdBook = (req, res) => {
    CommentModel.getCommentByIdBook(req.params.idbook, (err, data) => {
    if (err)
        res.send(false);
    else res.send(data);
  });
};

exports.uploadFile = (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files;
  if(myFile.photo1){
    myFile.photo1.mv(`${__dirname}/../../public/comments/${myFile.photo1.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    })
  }
  if(myFile.photo2){
    myFile.photo2.mv(`${__dirname}/../../public/comments/${myFile.photo2.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    })
  }
  if(myFile.photo3){
    myFile.photo3.mv(`${__dirname}/../../public/comments/${myFile.photo3.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    })
  }
  if(myFile.photo4){
    myFile.photo4.mv(`${__dirname}/../../public/comments/${myFile.photo4.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
    })
  }
};