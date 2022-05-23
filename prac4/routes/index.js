var express = require('express');
var router = express.Router();

/* GET home page. */

var lastmessage;
router.get('/test.txt', function(req, res, next){
  if (typeof lastmessage !== 'undefined'){
    res.send(lastmessage.toString());
  }else{
    res.send();
  }
  lastmessage = new Date();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
