const sql = require("../utils/mysql.util.js");

const CartModel = function(cartItem) {
    this.user = cartItem.user,
    this.idbook = cartItem.idbook,
    this.title = cartItem.title;
    this.imgUrl = cartItem.imgUrl;
    this.price = cartItem.price;
    this.quantity = cartItem.quantity;
  };
  
CartModel.create = (newCart, result) => {
    sql.query("INSERT INTO cart SET ?", newCart, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { ...newCart });
    });
};
  
CartModel.getAll = (title, result) => {
    let query = "SELECT * FROM cart";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
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

CartModel.findById = (id,user, result) => {
    sql.query(`SELECT * FROM cart WHERE idbook = ${id} AND user= '${user}'`, (err, res) => {
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

CartModel.findByName = (name, result) => {
  let query = `SELECT * FROM cart WHERE user = '${name}'`;
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

CartModel.updateById = (id, cart, result) => {
  sql.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [cart.quantity, id],
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
      result(null, { id: id, ...cart });
    }
  );
};

CartModel.remove = (id, result) => {
    sql.query("DELETE FROM cart WHERE id = ?", id, (err, res) => {
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

CartModel.removeAll = result => {
    sql.query("DELETE FROM cart", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
    //   console.log(`deleted ${res.affectedRows} tutorials`);
      result(null, res);
    });
};



module.exports = CartModel;