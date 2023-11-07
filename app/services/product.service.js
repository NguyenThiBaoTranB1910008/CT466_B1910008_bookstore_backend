const db = require("../models/index.js")
const { Op } = require("sequelize");

exports.create = (newProduct, result) => {
  db.product.create(
    newProduct
  ).then(function(product) {
    result(null, product);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};
  
exports.getAll = (result) => {
  db.product.findAll().then(function(product) {
      result(null, product);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
  })
};

exports.findById = (id, result) => {
  db.product.findOne({
    where: { id: id},
  }).then(function(product) {
    result(null, product);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.findByFilter = (req, result) => {
  let category = req.body.category ? req.body.category : "";
  let search = req.body.search ? req.body.search : "";
  let min = req.body.min ? req.body.min : 0;
  let max = req.body.max ? req.body.max : 1000000;
  let brands= req.body.brand ? req.body.brand : ['NXB Kim Đồng', 'NXB Trẻ', 'NXB Giáo dục', 'NXB Đại học Cần Thơ','NXB Phương Nam','NXB Văn Học']
  if(req.body.order)
      db.product.findAll({
        where: {
          category: {[Op.substring] : category},
          price: {
            [Op.gte]: min,
            [Op.lte]: max
          },
          title:  {[Op.substring] : search},
          brand: { [Op.in]: brands},
        },
        order: [
          ['price', req.body.order]
        ],
      }).then(function(product) {
        //product = product.slice((req.body.pagination.page-1)*req.body.pagination.limit, req.body.pagination.page*req.body.pagination.limit) 
        result(null, product);
        }).catch((err)=>{
          console.log("error: ", err);
          result(null, err);
          return;
      });
  else 
      db.product.findAll({
        where: {
          category: {[Op.substring] : category},
          price: {
            [Op.gte]: min,
            [Op.lte]: max
          },
          title:  {[Op.substring] : search},
          brand: { [Op.in]: brands},
        }
      }).then(function(product) {
        //product = product.slice(req.body.pagination.page-1, req.body.pagination.page*req.body.pagination.limit) 
        result(null, product);
        }).catch((err)=>{
          console.log("error: ", err);
          result(null, err);
          return;
      });
};

exports.getLimit = (result) => {
  db.product.findAll({ limit: 5 ,
    order: [
    ['id', 'DESC']
    ]}
    ).then(function(product) {
    result(null, product);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  })
};

exports.updateById = (id, product, result) => {
  db.product.update( product, {
    where: {
      id: id
    }
  })
  .then(function(product) {
    result(null, product);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.remove = (id, result) => {
  db.product.destroy({
    where: { id: id},
  }).then(function(product) {
    result(null, product);
    }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};

exports.order = (id, quantity1, result) => {
  db.product.findOne({
    where: { id: id},
  }).then(function(product) {
    db.product.update( {quantity: product.quantity - quantity1}, {
      where: {
        id: id
      }
    })
    .then(function(product) {
      result(null, product);
      }).catch((err)=>{
        console.log("error: ", err);
        result(null, err);
        return;
    });
  }).catch((err)=>{
      console.log("error: ", err);
      result(null, err);
      return;
  });
};


