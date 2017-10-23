const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const indexRoutes = require('./routes/api');

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/interclub-challenge', { useMongoClient: true });

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', indexRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

const PORT = 4000;
app.listen(PORT, function () {
    console.log(`Server listening on Port ${PORT}`);
});
