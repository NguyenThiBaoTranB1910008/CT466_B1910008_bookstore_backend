const sql = require("../utils/mysql.util.js");

const AnnounceModel = function(announce) {
    this.date = announce.date,
    this.user = announce.user,
    this.idOrder = announce.idOrder,
    this.content = announce.content;
    this.status = announce.status;
  };
  
AnnounceModel.create = (announment, result) => {
    sql.query("INSERT INTO announment SET ?", announment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...announment });
    });
};
  
AnnounceModel.findByName = (name, result) => {
    // console.log(name)
  let query = `SELECT * FROM announment WHERE user = '${name}'`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      // console.log("tutorials: ", res);
      result(null, res);
    })
};

AnnounceModel.seen = (name, result) => {
  // console.log(name)
let query = `UPDATE announment SET status = 1 WHERE user = '${name}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("tutorials: ", res);
    result(null, res);
  })
};

AnnounceModel.newNotify = (name, result) => {
  let query = `SELECT * FROM announment WHERE user = '${name}' and status= 0`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    })
};


module.exports = AnnounceModel;