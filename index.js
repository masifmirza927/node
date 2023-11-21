const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product");

// middleware
app.use(express.json());


app.get('/', (req, res) => {

    res.status(200).json({
        message: "hello from node"
    })
})


app.post("/product/create", async (req, res) => {

    // console.log( req.body )
    // return;
   const newProduct  =  await Product.create(req.body);
 
    res.status(201).json({
        newProduct: newProduct,
        message: "product created"
    })
});



mongoose.connect("mongodb://127.0.0.1:27017/pledgesdb").then(() => {
    app.listen(4000, () => {
        console.log("db connected and server is up now");
    })
})



