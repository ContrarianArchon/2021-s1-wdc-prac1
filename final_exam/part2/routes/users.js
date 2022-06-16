var argon2 = require('argon2');
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {

     if( 'username' in req.body && req.body.username != null &&
        'password' in req.body && req.body.password != null) {

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `SELECT u_id,given_name,family_name,username,email,role,password_hash
                            FROM users WHERE username = ?`;
            connection.query(query,[req.body.username], async function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){

                  let valid = await argon2.verify(rows[0].password_hash, req.body.password);

                  if (valid) {
                      req.session.user = rows[0];
                      delete req.session.user.password_hash;
                      res.cookie('role', req.session.user.role);
                      res.json(rows[0]);
                  } else {
                      return res.sendStatus(401);
                  }

              } else {
                  res.sendStatus(401);
              }
            });
        });


    } else {
        res.sendStatus(400);
    }

});



router.post('/signup', async function(req, res, next) {

    if( 'username' in req.body && req.body.username != null &&
        'password' in req.body && req.body.password != null &&
        'email' in req.body &&
        'given_name' in req.body &&
        'family_name' in req.body) {


        let hash = await argon2.hash(req.body.password);
        console.log(hash);

        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            var query = `INSERT INTO users (given_name,family_name,username,password_hash,email,role)
                            VALUES (?,?,?,?,?,'user');`;
            connection.query(query,[
                req.body.given_name,
                req.body.family_name,
                req.body.username,
                hash,
                req.body.email], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              res.end();
            });
        });



    } else {
        res.sendStatus(400);
    }

});


router.use(function(req, res, next) {
    if('user' in req.session){
        next();
    } else {
        res.sendStatus(401);
    }
});


router.post('/logout', function(req, res, next) {

    delete req.session.user;
    res.cookie('role', 'anon');
    res.send();

});






module.exports = router;
