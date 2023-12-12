const OrderModel = require("../services/order.service");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    const orderModel = {
      idUser: req.body.idUser,
      idAddress: parseInt(req.body.idAddress),
      note: req.body.note,
      dayOrder: req.body.dayOrder,
      dayConfirm: "",
      dayReceipt: "",
      totalItems: req.body.totalItems,
      total: req.body.total,
      cart: req.body.cart
    };

    OrderModel.create(orderModel, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the order"
            });
        else res.send(data);
        });
};

exports.findAll = async (req , res, next) =>{
    const title = req.query.title;

    OrderModel.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};

exports.findByAcc = (req, res) => {
    OrderModel.getOrderByAcc(req.params.accname, (err, data) => {
    if (err)
        res.send(false);
    else res.send(data);
  });
};

exports.statistic = (req, res) => {
  OrderModel.statistic(req.body.dateStart, req.body.dateEnd , (err, data) => {
  if (err)
      res.send(false);
  else res.send(data);
});
};

exports.OrderDetailStatistic = (req, res) => {
  OrderModel.orderDetailstatistic(req.body.dateStart, req.body.dateEnd , (err, data) => {
  if (err)
      res.send(false);
  else res.send(data);
});
};


exports.findOrderDetail = (req, res) => {
    OrderModel.getOrderDetail(req.params.id, (err, data) => {
    if (err)
        res.send(false);
    else res.send(data);
  });
};

exports.confirm = (req, res) => {
  OrderModel.confirm(req , (err, data) => {
  if (err)
      res.send(false);
  else res.send(data);
  });
};

exports.findOrderDetail = (req, res) => {
  OrderModel.getOrderDetail(req.params.id, (err, data) => {
  if (err)
      res.send(false);
  else res.send(data);
});
};

exports.findByFilter= (req, res) => {
  console.log(req.body)
  OrderModel.findByFilter(req, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};

exports.findById= (req, res) => {
  OrderModel.findById(req.params.id, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};

exports.reviewById= (req, res) => {
  OrderModel.reviewById(req, (err, data) => {
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    else res.send(data);
  });
};
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//     }
  
//   CartModel.updateById(
//     req.params.id,
//       new CartModel(req.body),
//       (err, data) => {
//         if (err) {
//             // console.log("error");
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found cart item with id ${req.params.id}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Error updating quality of cart item with id " + req.params.id
//             });
//           }
//         } else res.send(data);
//       }
//     );
// };
  
// exports.delete = (req, res) => {
//     CartModel.remove(req.params.id, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found cart with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Could not delete cart with id " + req.params.id
//           });
//         }
//       } else res.send({ message: `Cart item was deleted successfully!` });
//     });
// };
  
//   // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     ProductModel.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all cart."
//         });
//       else res.send({ message: `All cart were deleted successfully!` });
//     });
// };