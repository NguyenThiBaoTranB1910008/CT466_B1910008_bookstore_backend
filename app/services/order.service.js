const sql = require("../utils/mysql.util.js");

const OrderModel = function(order) {
    this.accname= order.accname;
    this.phone = order.phone;
    this.lastname= order.lastname;
    this.firstname = order.firstname;
    this.address = order.address;
    this.city = order.city;
    this.country = order.country;
    this.note = order.note;
    this.dayOrder = order.dayOrder;
    this.total = order.total;
    this.cart = order.cart;
};

 
  
OrderModel.create = (newOrder, result) => {
  newOrder.address = newOrder.address + ", " + newOrder.city + ", "+ newOrder.country
  sql.query("INSERT INTO orders SET accname = ?, phone= ?, lastname= ?, firstname = ?, address=?, note=?, dayOrder = ?,total=?, status = 'wait'", [newOrder.accname,newOrder.phone,newOrder.lastname, newOrder.firstname,
           newOrder.address, newOrder.note, newOrder.dayOrder, newOrder.total],  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });


  newOrder.cart.forEach(element => {
    sql.query("INSERT INTO orderdetail SET idOrder = (SELECT MAX(id) FROM orders), ?",element, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }  
  });
  });
  result(null, { ...newOrder });
};
  
OrderModel.getOrderByAcc = (accname, result) => {
    let query = `SELECT * FROM orders WHERE accname = '${accname}'`
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
};

OrderModel.getOrderDetail = (id, result) => {
  let query = `SELECT * FROM orderdetail WHERE idOrder = ${id} `

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

OrderModel.confirm = (id, type, result) => {
  let query = `UPDATE orders SET status = '${type}' WHERE id = ${id} `

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};


OrderModel.getAll = (title, result) => {
  let query = "SELECT * FROM orders";

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

OrderModel.findByFilter = (req, result) => {
  let status = req.body.status ? `WHERE status  = '${req.body.status}'` : "WHERE status LIKE '%%'";
  let user = req.body.id ? `AND accname= '${req.body.id}'` : "";
  sql.query(`SELECT * FROM orders ${status} ${user}` , (err, res) => {
    // console.log(`SELECT * FROM orders ${status} ${user}`)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length >= 0) {
      result(null, res);
      return;
    }


    // not found Tutorial with the id
    // result({ kind: "not_found" }, null);
  });
};
// ProductModel.findById = (id, result) => {
//     sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
//       if (err) {
//         // if(res.length==0)
//           console.log("error: ", err);
//           result(err, null);
//         return;
//       }
  
//       if (res.length) {
//         result(null, res[0]);
//         return;
//       }
  
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//     });
// };

// ProductModel.findByFilter = (req, result) => {
//   let order = req.body.order ? `ORDER BY price ${req.body.order}` : "";
//   let category = req.body.category ? `category = '${req.body.category}' AND` : "";
//   let search = req.body.search ? req.body.search : "";
//   let min = req.body.min ? req.body.min : 0;
//   let max = req.body.max ? req.body.max : 1000000;
//   let brands= req.body.brand ? req.body.brand : []
//   let brand= req.body.brand && req.body.brand.length!=0 ? `AND `: ""
//   brands.map((element,i) => {
//     brand += `brand = "${element}" `
//     if(i!=brands.length-1)
//       brand += " OR "
//   })

//   sql.query(`SELECT * FROM products WHERE ${category} price >= ${min}
//              AND price <= ${max} AND title LIKE '%${search}%' ${order} ${brand}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length >= 0) {
//       result(null, res);
//       return;
//     }


//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// ProductModel.getLimit = (id, result) => {
//   sql.query(`SELECT * FROM products ORDER BY id DESC LIMIT 5 `, (err, res) => {
//     if (err) {
//         console.log("error: ", err);
//         result(err, null);
//       return;
//     }

//     if (res.length) {
//       result(null, res);
//       return;
//     }
//   });
// };

// ProductModel.updateById = (id, product, result) => {
//     sql.query(
//       "UPDATE products SET title = ?, author = ?, imageUrl = ?, price = ?, category = ?, page = ?, brand  = ?, language = ?, releaseDate = ?, description = ? WHERE id = ?",
//       [product.title, product.author, product.imageUrl, product.price,
//          product.category, product.page, product.brand, product.language, product.releaseDate, product.description, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
  
//         if (res.affectedRows == 0) {
//           // not found Tutorial with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }
  
//         // console.log("updated tutorial: ", { id: id, ...tutorial });
//         result(null, { id: id, ...product });
//       }
//     );
// };

// ProductModel.remove = (id, result) => {
//     sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
  
//     //   console.log("deleted tutorial with id: ", id);
//       result(null, res);
//     });
//   };

// ProductModel.removeAll = result => {
//     sql.query("DELETE FROM products", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//     //   console.log(`deleted ${res.affectedRows} tutorials`);
//       result(null, res);
//     });
// };
module.exports = OrderModel;

