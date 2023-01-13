const express = require('express');
const { restart } = require('nodemon');

const app = express();
const mongoConnect = require('./util/database').mongoConnect;
const reportRoute = require('./routes/report'); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/report', reportRoute);


mongoConnect(() => {
    app.listen(8080);
});



