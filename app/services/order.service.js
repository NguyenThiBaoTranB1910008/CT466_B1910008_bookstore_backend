const db = require("../models/index.js")
const { Op } = require("sequelize");
  
exports.create = (newOrder, result) => {
  db.order.create(
    {
      idUser: newOrder.idUser,
      idAddress: newOrder.idAddress,
      note: "." ,
      dayOrder: newOrder.dayOrder, 
      dayConfirm: newOrder.dayConfirm,
      dayReceipt: newOrder.dayReceipt,
      totalItems: newOrder.totalItems,
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
            quantity: element.quantity,
            review: 0
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
      idUser: accname
    },
    include: [
      {
          association: "order_address",
          attributes: ["name","phone", "city", "district", "ward", "address"]
      }
    ]
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

exports.confirm = (req, result) => {
  if(req.body.dayConfirm){
    db.order.update( {status: req.body.type, dayConfirm: req.body.dayConfirm}, {
      where: {
        id: req.body.id
      }
    })
    .then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });}
  else{
    db.order.update( {status: req.body.type, dayReceipt: req.body.dayReceipt}, {
      where: {
        id: req.body.id
      }
    })
    .then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
  }
};


exports.getAll = (title, result) => {
  db.order.findAll({ 
    include: [
      {
          association: "order_address",
          attributes: ["name","phone", "city", "district", "ward", "address"]
      }
    ]}
  ).then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.findByFilter = (req, result) => {
  console.log(req.body)
  let status = req.body.status ? req.body.status : "";
  if(req.body.id)
    db.order.findAll({
      where: {
        idUser: req.body.id,
        status:  {[Op.substring] : status},
      },
      include: [
        {
            association: "order_address",
            attributes: ["name","phone", "city", "district", "ward", "address"]
        }
      ]
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
      },
      include: [
        {
            association: "order_address",
            attributes: ["name","phone", "city", "district", "ward", "address"]
        }
      ]
    }).then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
  }
};

exports.findById = (id, result) => {
    db.order.findAll({
      where: {
        id: id
      },
      include: [
        {
            association: "order_address",
            attributes: ["name","phone", "city", "district", "ward", "address"]
        }
      ]
    }).then(function(order) {
      result(null, order);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
};

exports.reviewById = (req, result) => {
  db.orderdetail.update( {review: 1}, {
    where: {
      idOrder: req.body.idOrder,
      idBook: req.body.idBook
    }
  }).then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.statistic = (dateStart, dateEnd, result) => {
  db.order.findAll({
    where: {
      "dayOrder": {
        [Op.and]: {
          [Op.gte]: dateStart,
          [Op.lte]: dateEnd
        }
      }
    }
  }).then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.orderDetailstatistic = (dateStart, dateEnd, result) => {
  db.orderdetail.findAll({
    where: {
      "dayOrder": {
        [Op.and]: {
          [Op.gte]: dateStart,
          [Op.lte]: dateEnd
        }
      }
    }
  }).then(function(order) {
    result(null, order);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
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

