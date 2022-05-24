var express = require('express');
var router = express.Router();
router.post('/*', function(req, res, next){
  console.log("POST from a user");
  next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
