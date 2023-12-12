'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderModel extends Model {
        static associate(models) {   
        }
      }
      OrderModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        idUser: DataTypes.INTEGER,
        idAddress: DataTypes.INTEGER,
        note : DataTypes.STRING,
        dayOrder: DataTypes.STRING,
        dayConfirm: DataTypes.STRING,
        dayReceipt: DataTypes.STRING,
        totalItems: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        status : DataTypes.STRING,
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'orders',
      });
    return OrderModel;
  };
