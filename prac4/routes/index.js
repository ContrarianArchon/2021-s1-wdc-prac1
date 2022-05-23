var express = require('express');
var router = express.Router();

/* GET home page. */

var lastmessage;
router.get('/test.txt', function(req, res, next){
  res.send(lastmessage.toString());
  lastmessage = new date();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
