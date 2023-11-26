'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartModel extends Model {
        static associate(models) {   
        }
      }
      CartModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        idUser: DataTypes.INTEGER,
        idbook : DataTypes.INTEGER,
        title: DataTypes.STRING,
        imgUrl: DataTypes.STRING,
        price : DataTypes.INTEGER,
        quantity : DataTypes.INTEGER,
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'cart',
      });
    return CartModel;
  };
