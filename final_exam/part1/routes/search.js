var express = require('express');
var router = express.Router();

router.post('/text', function(req, res, next) {
    res.send(req.body.searchstring);
});

router.post('/date', function(req, res, next) {
    res.send(req.body.start_date + " " + req.body.end_date);
});

module.exports = router;
