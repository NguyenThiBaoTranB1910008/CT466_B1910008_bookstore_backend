'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderDetailModel extends Model {
        static associate(models) {   
        }
      }
      OrderDetailModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        idOrder: DataTypes.INTEGER,
        idBook: DataTypes.INTEGER,
        imgUrl: DataTypes.STRING,
        title : DataTypes.STRING,
        price: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'orderdetail',
      });
    return OrderDetailModel;
  };
