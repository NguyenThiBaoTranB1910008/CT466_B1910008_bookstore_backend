const { query } = require("express");
const sql = require("../utils/mysql.util.js");

const UserModel = function(user) {
    this.id = user.id,
    this.fullname = user.fullname;
    this.accname = user.accname;
    this.isadmin = 0;
    this.pass = user.pass;
  };
  
UserModel.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...newUser });
    });
};
  
UserModel.getAll = ( result) => {
    let query = "SELECT * FROM users";
   
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      // console.log("tutorials: ", res);
      result(null, res);
    });
  };

UserModel.findByAccName = (accname, result) => {
    sql.query(`SELECT * FROM users WHERE accname = '${accname}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
};

UserModel.findByFilter = (req, result) => {
  let search = req.body.search ? req.body.search : "";
  sql.query(`SELECT * FROM users WHERE accname LIKE '%${search}%'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

UserModel.checkAccName = (accname, result) => {
    sql.query(`SELECT * FROM users WHERE accname = '${accname}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result(null, false);
    });
};

UserModel.loginCheck= (accname,pass, result) => {
    sql.query(`SELECT * FROM users WHERE accname = '${accname}' AND  pass = '${pass}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
    //   console.log(accname, pass)
      result(null, false);
    });
};

UserModel.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

  //   console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

UserModel.updateAdmin = (id, isadmin, result) => {
  sql.query("UPDATE users SET isadmin= ? WHERE id = ?",[isadmin ,  id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

  //   console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

UserModel.update = (id, user, result) => {
  sql.query(
    "UPDATE users SET ? WHERE id = ?",
    [user, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { ...user });
    }
  );
};

module.exports = UserModel;