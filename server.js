const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// JSON middleware for parsing request bodies
app.use(express.json());

// Helmet middleware for secure HTTP headers
app.use(helmet());

// Morgan middleware for logging HTTP requests to console
app.use(morgan('combined'));

// CORS middleware for enabling cross-origin resource sharing
app.use(cors());

mongoose.connect(dbConfig.url).then(function () {
    console.log('Connected to MongoDB Server E-Com')
}).catch(function (err) {
    console.log(err)
})

require('./routes/auth.route')(app);
require('./routes/address.route')(app);
require('./routes/product.route')(app);
require('./routes/order.route')(app);


// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Server Running on Port 8080');
})