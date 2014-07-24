var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

/* Process the submit of the user ticket */
router.post('/', function(req, res) {
    res.render('index');
});

/* Show the thank you page after ticket is submitted */
router.post('/thankyou', function(req, res) {
    res.render('thankyou');
});

module.exports = router;
