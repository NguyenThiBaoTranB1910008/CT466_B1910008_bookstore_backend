'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model {
        static associate(models) {
          UserModel.belongsTo(models.comment, {
            foreignKey: "idUser", // Column name of associated table
        });
        }
      }
      UserModel.init({
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        fullname: DataTypes.STRING,
        accname : DataTypes.STRING,
        isadmin : { type: DataTypes.INTEGER, defaultValue: 0},
        pass: DataTypes.STRING
        }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'users',
      });
    return UserModel;
  };
