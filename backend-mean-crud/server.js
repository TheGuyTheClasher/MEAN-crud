const http = require('http');
const body_parser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const config = require('./DB')
const productRoute = require('./routes/product.route')
const router = express.Router()

const app = express();

let port = process.env.PORT || 8080;

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true }).then(() => {
    console.log('connected to the database.')
}, err => {
    console.log('Error connecting..' + err);
});

app.use(body_parser.json());
app.use(cors())
app.use('/products', productRoute)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


