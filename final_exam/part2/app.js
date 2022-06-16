var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    // port: 3306,
    // user: 'MySQL Username',
    // password : 'MySQL Password',
    multipleStatements: true
});

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'a706835de79a2b4e90506f582af3676ac8361521',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(function(req, res, next) {
    if('user' in req.session){
        res.cookie('role', req.session.user.role);
    } else {
        res.cookie('role', 'anon');
    }
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function initialise_db(){
    dbConnectionPool.getConnection( function(err,connection) {
        if (err) {
          console.error("Unable to configure database. Is your database running and has the correct permissions?");
          return;
        }
        var setup = `
        DROP DATABASE IF EXISTS wdc22_final_p2;
        CREATE DATABASE wdc22_final_p2;
        USE wdc22_final_p2;

        CREATE TABLE users (
            u_id INT AUTO_INCREMENT,
            given_name VARCHAR(50),
            family_name VARCHAR(50),
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(128),
            role VARCHAR(16),
            password_hash VARCHAR(256),
            PRIMARY KEY (u_id)
        );

        CREATE TABLE posts (
            p_id INT AUTO_INCREMENT,
            author INT,
            title TEXT,
            content LONGTEXT,
            timestamp DATETIME,
            PRIMARY KEY (p_id),
            FOREIGN KEY (author) REFERENCES users(u_id) ON DELETE SET NULL
        );

        CREATE TABLE comments (
            c_id INT AUTO_INCREMENT,
            post INT,
            author INT,
            title TEXT,
            content LONGTEXT,
            timestamp DATETIME,
            PRIMARY KEY (c_id),
            FOREIGN KEY (author) REFERENCES users(u_id) ON DELETE SET NULL,
            FOREIGN KEY (post) REFERENCES posts(p_id) ON DELETE CASCADE
        );

        INSERT INTO users VALUES (1,'Alice','User','alice','alice@example.example','admin','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w'),
                                (2,'Bob','User','bob','bob@example.example','user','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w');
        INSERT INTO posts VALUES (1,1,'First Post','This is a post','2022-05-28 06:23:28');
        INSERT INTO comments VALUES (1,1,1,'First comment','This is a comment','2022-05-28 06:25:31');

        `;
        connection.query(setup, function(err, rows, fields) {
          connection.release(); // release connection
          if (err) {
            console.error("Unable to configure database. Is your database running and has the correct permissions?");
            return;
          }
          dbConnectionPool.on('connection', function (connection) {
            connection.query('USE wdc22_final_p2;');
          });
        });
    });
}

initialise_db();

module.exports = app;
