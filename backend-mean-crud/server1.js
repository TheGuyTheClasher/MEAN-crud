const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const config = require('./DB')

const app = express();

let port = process.env.PORT || 3000;

const productRoute = require('./routes/product.route')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true }).then(() => {
    console.log('connected to the database.')
}, err => {
    console.log('Error connecting..' + err);
});

app.use(body_parser.json());
app.use(cors())
app.use('/products', productRoute)

const server = app.listen(() => {
    console.log("listening on port.." + port);

})
