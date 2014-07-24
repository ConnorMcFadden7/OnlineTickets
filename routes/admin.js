var express = require('express');
var router  = express.Router();

/* Show all open tickets. */
router.get('/', function(req, res) {
    res.render('admin/index');
});

/* Show a single ticket */
router.get('/ticket/:id', function(req, res) {
    // Get the ticket Id
    var ticketId = req.params.id;

    res.render('admin/ticket');
});

module.exports = router;
