var express = require('express');
var router  = express.Router();
var MongoClient = require('mongodb').MongoClient;

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

    // Retreieve the information the user enters
	var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    // Connect to database
    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {
    	// Ensure we have connected
    	if(err) {
    		console.log("Cannot connect to database");
    	} else {
    		console.log("Connected to database");
    	}
    	// Create a collection to insert the tickets
    	var collection = db.collection('tickets');
        var ticketDocs = [{'name':name, 'email':email, 'subject':subject, 'message':message }];
	    collection.insert(ticketDocs, {w:1}, function(err, data) {
	    	// Check if the ticket has been inserted
	    	if(err) {
	    		console.log("There was a problem adding the information to the database.");
	    	} else {
	    		console.log("Added to database!" + name + " " + email);
	    	}
	    });
	});
});
router.post('/opentickets', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {

        // Ensure we have connected
        if(err) {
                console.log("Cannot connect to database");
        } else {
                console.log("Connected to database");
        }
        // Create a collection to query
        var collection = db.collection('tickets');

        // Query the collection
        collection.find({}, function(err, cursor) {
 
            cursor.toArray(function(err, tickets) {
                console.log(tickets);
                res.render('admin/index', { mainValues : tickets });
            });          
        });
    });
});
module.exports = router;
