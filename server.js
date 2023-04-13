const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config')

app.use(express.json());

mongoose.connect(dbConfig.url).then(function () {
    console.log('Connected to MongoDB Server E-Com')
}).catch(function (err) {
    console.log(err)
})

require('./routes/auth.route')(app);
require('./routes/address.route')(app);

app.listen(8080, () => {
    console.log('Server Running on Port 8080');
})