var express = require('express');
var router  = express.Router();
var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

/* Show all open tickets. */
router.get('/', function(req, res) {
    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {
    
        // Ensure we have connected and the database isn't null
        if(err || db == null) {
            console.log("Cannot connect to database");
        } else {
            console.log("Connected to database");
        }
        // Create a collection to query
        var collection = db.collection('tickets');
        var open = "Open";
        // Query the collection for open tickets
        collection.find({open : open}, function(err, cursor) {
            // Convert the cursor to an array so we can access the collection documents
            cursor.toArray(function(err, tickets) {
                if(err || tickets == null) {
                    console.log("Tickets is null")
                } else {
                    console.log(tickets);
                    res.render('admin/index', { mainValues : tickets });
                }    
            });          
        });
    });
});


/* Show a single ticket */
router.get('/ticket/:id', function(req, res) {

    // Get the ticket Id
    console.log("Req: " + req.params.id);
    ticketId = req.params.id;

    console.log("Ticket id is: " + ticketId);

    MongoClient.connect("mongodb://localhost:27017/tickets", function(err, db) {

        // Ensure we have connected
        if(err || db == null) {
            console.log("Cannot connect to database");
        } else {
            console.log("Connected to database");
        }
        // Create a collection to query
        var collection = db.collection('tickets');
        // Query the collection

        collection.findOne({_id : new ObjectID(ticketId)}, function(err, ticket) {
            if(err || ticket == null) {
                console.log("Ticket is null");
            } else {
                console.log("No error has been reported");
                console.log(ticket);
                res.render('admin/ticket', { ticket : ticket });
            } 
        });        
    });
});


module.exports = router;