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
    open = "Open";
    reply = "";
    // Connect to database
    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {
    	// Ensure we have connected
    	if(err || db == null) {
    		console.log("Cannot connect to database");
    	} else {
    		console.log("Connected to database");
    	}
    	// Create a collection to insert the tickets
    	var collection = db.collection('tickets');
        var ticketDocs = [{'name':name, 'email':email, 'subject':subject, 'message':message, 'open':open, 'reply':reply }];
	    collection.insert(ticketDocs, {w:1}, function(err, data) {
	    	// Check if the ticket has been inserted
	    	if(err || data == null) {
	    		console.log("There was a problem adding the information to the database. Check if all the data was entered.");
	    	} else {
	    		console.log("Added to database!" + name + " " + email);
	    	}
	    });
	});
});
router.post('/opentickets', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {

        // Ensure we have connected
        if(err || db == null) {
                console.log("Cannot connect to database");
        } else {
                console.log("Connected to database");
        }
        // Create a collection to query
        var collection = db.collection('tickets');
        // Update ticket to closed after the admin has replied
        var replyMessage = req.body.reply;
        console.log("Reply message is: " + replyMessage);
        collection.update({_id : new ObjectID(ticketId)}, {$set:{reply:replyMessage}}, {w:1}, function(err, result) {
            if(err || result == null) {
                console.log("There was a problem inserting the admin reply.");
            } else {
                console.log("Admin reply inserted.")
            }
        });
        closed = "Closed";
        open = "Open";
        collection.update({_id : new ObjectID(ticketId)}, {$set:{open:closed}}, {w:1}, function(err, result) {
            if(err || result == null) {
                console.log("There was a problem updating the ticket status.");
            } else {
                console.log("Ticket status updated.");
            }
        });

        // Query the collection
        collection.find({open : open}, function(err, cursor) {
            // Pass the updated tickets to the index.ejs form
            cursor.toArray(function(err, tickets) {
                if(tickets == null) {
                    res.end("There are no tickets in the array.");
                } else {
                    console.log(tickets);
                    res.render('admin/index', { mainValues : tickets });
                }
                
            });          
        });
    });
});
module.exports = router;
