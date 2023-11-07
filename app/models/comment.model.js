'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CommentModel extends Model {
        static associate(models) {   
        //   comment.belongsTo(models.user, {
        //     foreignKey: "id",
        //     as: "user" // Alias for the table
        // });
        }}
      CommentModel.init({
        idBook: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            primaryKey: true,
        },
        idUser : DataTypes.STRING,
        ratting: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        dateCmt: DataTypes.STRING,
        img1: DataTypes.STRING,
        img2: DataTypes.STRING,
        img3: DataTypes.STRING,
        img4: DataTypes.STRING
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'comment',
      });
    return CommentModel;
  };
