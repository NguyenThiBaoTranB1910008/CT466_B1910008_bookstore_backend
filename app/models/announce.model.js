'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NotifyModel extends Model {
        static associate(models) {   
        }
      }
      NotifyModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        date: DataTypes.STRING,
        user : DataTypes.STRING,
        idOrder: DataTypes.INTEGER,
        content: DataTypes.STRING,
        status : DataTypes.INTEGER,
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'announment',
      });
    return NotifyModel;
  };
