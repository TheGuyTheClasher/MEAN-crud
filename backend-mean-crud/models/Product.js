const mongoose = require('mongoose')
const Schema = mongoose.Schema

// defining collection and schema for the model

let Product = new Schema({
    product_name: { type: String },
    product_description: { type: String },
    product_price: { type: Number }
}, { collection: 'Product' });

module.exports = mongoose.model('Product', Product)
