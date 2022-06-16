var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'hotel'
  });

var app = express();

app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);

module.exports = app;
