// Configuration
var MONGO_URI = "mongodb://localhost:27010/metawar";
var PORT = 12345;

var express = require('express');
var app = express();

app.use("/static", express.static(__dirname + '/static')); // Serve static files
app.use(express.bodyParser()); // Can parse POST requests
app.listen(PORT);

var mongo = require('mongodb').MongoClient;

app.get('/', function(request, response){
    response.sendfile("index.html");
});

app.get('/random', function(request, response) {
    mongo.connect(MONGO_URI, function(err, db){
        if(err){
            console.log(err);
        }
        db.collection('categories').find({}).toArray(function(err, docs) {
            var category = docs[Math.floor(Math.random() * docs.length)];
            response.send({
                "category" : category.name,
                "items" : [
                    category.items[Math.floor(Math.random() * category.items.length)],
                    category.items[Math.floor(Math.random() * category.items.length)],
                ]
            });
        });
    });
});
