var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/test.txt', function(req, res, next){
  var lastmessage = new Date;
  res.send("noise");
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
