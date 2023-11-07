'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductModel extends Model {
        static associate(models) {   
        }
      }
      ProductModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        author : DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        price : DataTypes.INTEGER,
        category: DataTypes.STRING,
        page : DataTypes.INTEGER,
        quantity : DataTypes.INTEGER,
        brand : DataTypes.STRING,
        language : DataTypes.STRING,
        releaseDate : DataTypes.STRING,
        size : DataTypes.STRING,
        type : DataTypes.STRING,
        description: DataTypes.STRING,
        highlight1 : DataTypes.STRING,
        highlight2 : DataTypes.STRING,
        highlight3 : DataTypes.STRING,
        }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'products',
      });
    return ProductModel;
  };
