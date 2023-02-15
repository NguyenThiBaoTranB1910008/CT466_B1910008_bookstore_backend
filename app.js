const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const productsRouter = require("./app/routes/product.route");
const cartRouter = require("./app/routes/cart.route");
const userRouter = require("./app/routes/user.route");
const orderRouter = require("./app/routes/order.route");
const announceRouter = require("./app/routes/announce.route");
const app = express();

app.use(cors());
app.use(express.json());

app.use(fileUpload());
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productsRouter);
app.use("/api/order", orderRouter);
app.use("/api/announment", announceRouter);
// file upload api
// console.log(__dirname + '/public/')
app.use(express.static(__dirname + '/public'));
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Nature Shop."});
});

app.use((req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
    // return next( new ApiError(404, "Resource not found"));
});

app.use ((err, req, res, next)=>{
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;