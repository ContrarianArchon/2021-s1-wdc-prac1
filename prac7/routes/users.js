var express = require('express');
var router = express.Router();
router.post('/*', function(req, res, next){
  console.log("POST from a user");
  next();
})
router.post('/*', function(req, res, next){
  if(req.get('content-type') != "application/json"){
    res.status(412);
    res.send();
  }else{
    next();
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
