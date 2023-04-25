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
        accname: DataTypes.STRING,
        phone : DataTypes.STRING,
        lastname: DataTypes.STRING,
        firstname: DataTypes.STRING,
        address : DataTypes.STRING,
        note : DataTypes.STRING,
        dayOrder: DataTypes.STRING,
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
