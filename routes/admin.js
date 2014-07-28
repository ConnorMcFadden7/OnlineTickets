var express = require('express');
var router  = express.Router();
var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
 
/* Show all open tickets. */
router.get('/', function(req, res) {
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
 

/* Show a single ticket */
router.get('/ticket/:id', function(req, res) {

    
    // Get the ticket Id
    console.log("Req: " + req.params.id);
    var ticketId = req.params.id;

    console.log("Ticket id is: " + ticketId);

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

        collection.findOne({_id : new ObjectID(ticketId)}, function(err, doc) {
            if(err) {
                console.log("There seems to be an error: " + err);
            } else {
                console.log("No error has been reported");
                console.log(doc);
                res.render('admin/ticket', { ticket : doc });
            } 
        });
    });
});
 
module.exports = router;