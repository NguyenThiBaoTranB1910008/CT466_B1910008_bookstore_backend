'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AddressModel extends Model {
        static associate(models) {}
    }
    AddressModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        idUser: DataTypes.INTEGER,
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        cityId: DataTypes.STRING,
        city: DataTypes.STRING,
        districtId: DataTypes.INTEGER,
        district: DataTypes.STRING,
        wardId: DataTypes.STRING,
        ward: DataTypes.STRING,
        address: DataTypes.STRING,
        default_value: DataTypes.INTEGER,
    }, {
        sequelize,
        updatedAt: false,
        createdAt: false,
        modelName: 'address',
    });
    return AddressModel;
};