var express = require('express');
var router  = express.Router();
var MongoClient = require('mongodb').MongoClient;
 
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
 
            cursor.toArray(function(err, array) {
                res.render('admin/index', { mainValues : array });
            });
 
            // Ensure the cursor isn't null
            // if(cursor != null) {
            //     if(err) {
            //         console.log("There seem's to be a problem: " + err);
            //     } else {
            //         console.log(cursor.toArray(function(err, item){}));
            //         // Pass the values to the table
                   
            //     }
            // }            
           
        });
    });
});
 
/* Process the submit of the user ticket */
router.post('/', function(req, res) {
    res.render('admin/index');
});
 
router.post('/openTicket', function(req, res) {
    res.render('admin/index');
});
 
/* Show a single ticket */
router.get('/ticket/:id', function(req, res) {
 
    // Get the ticket Id
    var ticketId = req.params.id;
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
            cursor.each(function(err, item) {
 
                // Ensure the item isn't null
                if(item != null) {
                    if(err) {
                        console.log("There seem's to be a problem: " + err);
                    } else {
                        console.log(item);
                       
                        // Pass the values to the table
                        res.render('admin/ticket', { nameValue : item['name'], emailValue : item['email'], subjectValue : item['subject'], messageValue : item['message'] });
                    }
                }            
            });
        });
    });
 
});
 
module.exports = router;