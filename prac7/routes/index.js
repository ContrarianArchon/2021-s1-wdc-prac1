var express = require('express');
var router = express.Router();

/*1.1 brew handling.*/
router.get('/brew', function(req, res, next){
  if(req.query.drink == "tea"){
    res.send("A delicious cup of tea!");
  }else if(req.query.drink == "coffee"){
    res.status(418);
    res.send();
  }else{
    res.status(400);
    res.send();
  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
