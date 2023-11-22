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

// get all product
// find by id
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            status: true,
            products: products
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "Product not found"
        })
    }
})

// find by id
app.get("/products/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        return res.status(200).json({
            status: true,
            product: product
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "Product not found"
        })
    }
})

app.post("/products", async (req, res) => {

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            newProduct: newProduct,
            message: "product created"
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
              errors[field] = error.errors[field].message;
            }
            res.status(422).json({ errors });
          } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
});

app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
            status: true,
            message: "product succesfully updated"
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "something went wrong"
        })
    }
});

// delete by id
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "product succesfully deleted"
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "something went wrong"
        })
    }
});



mongoose.connect("mongodb://127.0.0.1:27017/pledgesdb").then(() => {
    app.listen(4000, () => {
        console.log("db connected and server is up now");
    })
})



