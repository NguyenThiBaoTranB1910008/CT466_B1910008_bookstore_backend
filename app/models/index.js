const dbConfig = require("../utils/mysql.util");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.product = require("./product.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.orderdetail = require("./orderdetail.model")(sequelize, Sequelize);
db.announce = require("./announce.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.address = require("./address.model")(sequelize, Sequelize);
// // db.employee.hasOne(db.employeeSetting);
db.comment.belongsTo(db.user, {
  foreignKey: "idUser",
  as: "user_comment" 
});

db.user.hasMany(db.comment, {as : 'user_comment', foreignKey : 'idUser'});

db.comment.belongsTo(db.product, {
  foreignKey: "idBook",
  as: "product_comment" 
});

db.product.hasMany(db.comment, {as : 'product_comment', foreignKey : 'id'});

db.address.belongsTo(db.user, {
  foreignKey: "idUser",
  as: "user_address" 
});

db.address.hasMany(db.order, {as : 'order_address', foreignKey : 'idAddress'});

db.order.belongsTo(db.address, {
  foreignKey: "idAddress",
  as: "order_address" 
});

module.exports = db;