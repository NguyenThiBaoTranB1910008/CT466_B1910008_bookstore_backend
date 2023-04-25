const db = require("../models/index.js")
const { Op } = require("sequelize");
  
exports.create = (newOrder, result) => {
  db.order.create(
    {
      accname: newOrder.accname,
      phone: newOrder.phone,
      lastname: newOrder.lastname, 
      firstname: newOrder.firstname,
      address: newOrder.address, 
      note: newOrder.note, 
      dayOrder: newOrder.dayOrder, 
      total: newOrder.total,
      status: 'wait',
    }
  ).then(function(order) {
      newOrder.cart.forEach(element => {
        db.orderdetail.create(
          {
            idOrder: order.id,
            idBook: element.idbook,
            title: element.title, 
            imgUrl: element.imgUrl, 
            price: element.price, 
            quantity: element.quantity
          }
          ).then(function(orderdetail) {
            }).catch((err)=>{
              console.log("error: ", err);
              result(null, err);
              return;
          })})
      result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};
  
exports.getOrderByAcc = (accname, result) => {
  db.order.findAll({
    where: { 
      accname: accname
    },
  }).then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.getOrderDetail = (id, result) => {
  db.orderdetail.findAll({
    where: { 
      idOrder: id
    },
  }).then(function(orderdetail) {
    result(null, orderdetail);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.confirm = (id, type, result) => {
  db.order.update( {status: type}, {
    where: {
      id: id
    }
  })
  .then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};


exports.getAll = (title, result) => {
  db.order.findAll().then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.findByFilter = (req, result) => {
  let status = req.body.status ? req.body.status : "";
  if(req.body.id)
    db.order.findAll({
      where: {
        accname: req.body.id,
        status:  {[Op.substring] : status},
      }
    }).then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
  else{
    db.order.findAll({
      where: {
        status:  {[Op.substring] : status},
      }
    }).then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
  }
};

// orderModel.findById = (id, result) => {
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

