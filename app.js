const express = require("express");
const cors = require("cors");
const productsRouter = require("./app/routes/product.route");
const cartRouter = require("./app/routes/cart.route");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/product", productsRouter);
app.use("/api/cart", cartRouter);



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