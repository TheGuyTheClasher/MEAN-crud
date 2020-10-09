const express = require('express');
const app = express();
const productsRoutes = express.Router();

// import product model in our routes.
let Product = require('../models/Product');

// define the routes


// for add.

productsRoutes.route('/add').post((req, res) => {
    let product = new Product(req.body);
    product.save().then(product => {
        res.status(200).json({ Product: "Product has been added successfully!" });

    }).catch(err => {
        res.status(400).send('Unable to save to database.');
    });
});

// for find/get 

productsRoutes.route('/').get((req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        } else {
            res.json(products)
        }
    });
});



// for edit by id

productsRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        res.json(product)
    });

});


// for update

productsRoutes.route('/update/:id').post((req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if (!product) {
            res.status(400).send('Record not found!')
        } else {
            product.product_name = req.body.product_name;
            product.product_description = req.body.product_description;
            product.product_price = req.body.product_price;

            product.save().then(product => {
                res.json('update complete.')
            }).catch(err => {
                res.status(400).send('Unable to update the database.')
            })
        }
    });

});

// for delete/remove/destroy

productsRoutes.route('/delete/:id').get((req, res) => {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed successfully!')
        }
    });

});

module.exports = productsRoutes;

