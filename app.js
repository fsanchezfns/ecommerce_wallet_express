var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoDB = require('./db/mongoDB');
var fanout = require('./rabbit/fanout');
var direct = require('./rabbit/direct');


var indexRouter = require('./routes/index');
var operationsRouter = require('./routes/operations');
var walletRouter = require('./routes/wallet');
const { dir } = require('console');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/v1/operations', operationsRouter);
app.use('/v1/wallet', walletRouter);


fanout.init();
direct.init();


module.exports = app;