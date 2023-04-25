const AnnounceModel = require("../services/announce.service");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const announceModel = {
      date: req.body.date,
      user: req.body.user,
      idOrder: req.body.idOrder,
      content : req.body.content,
      status : false,
    };
  
    // Save Tutorial in the database
AnnounceModel.create(announceModel, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the anouncement"
        });
      else res.send(data);
    });
  };

exports.findByUser= (req, res) => {
    // console.log(req.params)
  AnnounceModel.findByName(req.params.user, (err, data) => {
    if (err)
        res.send("error");
    else res.send(data);
  });
};

exports.seen= (req, res) => {
  // console.log(req.params)
  AnnounceModel.seen(req.params.user, (err, data) => {
  if (err)
      res.send("error");
  else res.send(data);
  });
};

exports.newNotify= (req, res) => {
  AnnounceModel.newNotify(req.params.user, (err, data) => {
  if (err)
      res.send("error");
  else {
    res.send(data);
  }
  });
};
