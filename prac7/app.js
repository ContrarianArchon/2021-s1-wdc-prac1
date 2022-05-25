var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var accesscount = 0;
app.use(function(req, res, next){
    accesscount++;
    console.log("Received "+accesscount+" requests");
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/cookie', function(req, res, next){
    if(req.cookies == undefined){
      res.cookie("task3_1", 1);
      //console.log("cookie not found");
    }else if(req.cookies.task3_1 == undefined){
      res.cookie("task3_1", 1);
      //console.log("cookie not found");
    }else{
        req.cookies.task3_1++
        res.cookie("task3_1", req.cookies.task3_1);
      console.log(req.cookies.task3_1);
    }
    next();
  });

module.exports = app;
