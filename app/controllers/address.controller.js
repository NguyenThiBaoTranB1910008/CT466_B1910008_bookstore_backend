const express = require("express");
const AddressModel = require("../services/address.service");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const addressModel = {
        idUser: req.body.idUser,
        name: req.body.name,
        phone: req.body.phone,
        cityId: req.body.cityId,
        city: req.body.city,
        districtId: req.body.districtId,
        district: req.body.district,
        wardId: req.body.wardId,
        ward: req.body.ward,
        address: req.body.address,
        default_value: req.body.default_value
    };

    // Save Tutorial in the database
    AddressModel.create(addressModel, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the address"
            });
        else res.send(data);
    });
};

// exports.findAll = async (req , res, next) =>{
//     const title = req.query.title;

//     AddressModel.getAll(i, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                 err.message || "Some error occurred while retrieving orders."
//             });
//         else res.send(data);
//     });
// };

exports.findById = (req, res) => {
    AddressModel.findById(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving address."
            });
        else res.send(data);
    });
};

exports.isDefault = (req, res) => {
    AddressModel.isDefault(req, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving address."
            });
        else res.send(data);
    });
};


exports.delete = (req, res) => {
    AddressModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found address with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not address cart with id " + req.params.id
                });
            }
        } else res.send({ message: `Address item was deleted successfully!` });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log("hiii")
    console.log(req.params.id)
    AddressModel.updateById(
        req.params.id,
        req.body,
        (err, data) => {
            if (err) {
                // console.log("error");
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found address with id ${req.params.id}.`
                    });
                } else {
                    console.log("error")
                    res.status(500).send({
                        message: "Error updating address with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};