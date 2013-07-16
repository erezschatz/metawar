// Configuration
var MONGO_URI = "mongodb://localhost:27010/";
var PORT = 12345;

var express = require('express');
var app = express();

app.use("/static", express.static(__dirname + '/static')); // Serve static files
app.use(express.bodyParser()); // Can parse POST requests
app.listen(PORT);

var mongo = require('mongodb').MongoClient;

app.get('/', function(request, response){
    mongo.connect(MONGO_URI, function(err,db){
        if(err){
            return err;
        }

        db.collection('collection').find(function(err){
            if(err){
                return err;
            }

            // Close database
            db.close();

        });
    });
    //response.sendfile("index.html");
});
