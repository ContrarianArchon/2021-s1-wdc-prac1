var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

router.get('/posts', function(req, res, next) {

  if('user' in req.session){
      console.log(req.session.user);
  }

  req.pool.getConnection( function(err,connection) {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }
      var query = `SELECT  users.given_name AS author_name,
                          users.u_id AS author_id,
                          posts.title,
                          posts.content,
                          posts.timestamp,
                          posts.p_id AS post_id
                  FROM posts INNER JOIN users ON posts.author = users.u_id
                  ORDER BY posts.timestamp DESC
                  LIMIT 10;`;
      connection.query(query, function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }
        res.json(rows); //send response
      });
  });

});


router.post('/posts/new', function(req, res, next) {

    if(!'user' in req.session){
      res.sendStatus(401);
      return;
    }

    if( "title" in req.body && req.body.title !== null &&
        "content" in req.body && req.body.content !== null ) {
        req.body.author = req.session.user;

        req.pool.getConnection( function(err,connection) {
            if (err) {
              res.sendStatus(500);
              console.error(err);
              return;
            }
            var query = `INSERT INTO posts (author,title,content,timestamp) VALUES (?,?,?,NOW());`;
            connection.query(query, [req.body.author.u_id,req.body.title,sanitizeHtml(req.body.content)], function(err, rows, fields) {
                if (err) {
                    res.sendStatus(500);
                    console.error(err);
                    connection.release(); // release connection if error
                    return;
                }

                res.end(); //send response

            });
        });

    } else {
        res.sendStatus(400);
    }

});

router.get('/posts/:post_id/comments', function(req, res, next) {

  if('user' in req.session){
      console.log(req.session.user);
  }

  req.pool.getConnection( function(err,connection) {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }
      var query = `SELECT users.given_name AS author_name,
                          users.u_id AS author_id,
                          comments.title,
                          comments.content,
                          comments.timestamp,
                          comments.c_id AS comment_id
                    FROM comments INNER JOIN users ON comments.author = users.u_id
                    WHERE comments.post = ?;`;
      connection.query(query, [req.params.post_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }
        res.json(rows); //send response
      });
  });

});

router.post('/posts/:post_id/delete', function(req, res, next) {

  if(!'user' in req.session){
    res.sendStatus(401);
    return;
  }

  switch(req.session.user.role){
    case 'user':
      res.sendStatus(401);
    case 'admin':
      break;
    default:
      res.sendStatus(401);
      return;
  }

  req.pool.getConnection( function(err,connection) {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }
      var query = `DELETE FROM posts WHERE p_id=?;`;
      connection.query(query, [req.params.post_id], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }
        res.json(rows); //send response
      });
  });

});

router.post('/comments/new', function(req, res, next) {

  if(!'user' in req.session){
    res.sendStatus(401);
    return;
  }

  if( "title" in req.body && req.body.title !== null &&
      "content" in req.body && req.body.content !== null &&
      "post_id" in req.body && req.body.post_id !== null ) {
      req.body.author = req.session.user;

      req.pool.getConnection( function(err,connection) {
          if (err) {
            res.sendStatus(500);
            // console.error(err);
            return;
          }
          var query = `INSERT INTO questions (author,title,content,timestamp,post) VALUES (?,?,?,NOW());`;
          connection.query(query, [req.body.author.u_id,req.body.title,req.body.content,req.body.post_id], function(err, rows, fields) {
              if (err) {
                  res.sendStatus(500);
                  // console.error(err);
                  connection.release(); // release connection if error
                  return;
              }

              res.end(); //send response

          });
      });

  } else {
      res.sendStatus(400);
  }

});


module.exports = router;
