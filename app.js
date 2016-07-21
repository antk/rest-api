var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient; // the official Node.js mongodb driver
var ObjectID = mongodb.ObjectID;
var assert = require('assert');

var app = express();
app.use(bodyParser.json());

// db stuff
var url = 'mongodb://localhost:27017/runnerapi';
var RUNNERS_COLLECTION = "runners";
var db;

// connect to the database before starting app server
MongoClient.connect(url, function(err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  // save database object from callback for reuse
  db = database;
  console.log('Database connection ready');

  // initialize app
  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('App server listening on port', port);
  });
});

// basic error handler
var handleError = function (res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"status":code, "reason":reason, "error":message});
}

// basic test for the server
app.get('/', function(req, res) {
  res.send('Hello World');
});

// define CRUD (create, read, update, delete) routes

app.get('/runners', function(req, res) {
  db.collection(RUNNERS_COLLECTION).find({}).toArray(function(err, docs) {
    if(err) {
      handleError(res, err.message, "Failed to get runners");
    }
    else {
      res.status(200).json(docs);
    }
  });
});

app.get('/runners/:id', function(req, res) {
  db.collection(RUNNERS_COLLECTION).findOne({uid: new ObjectID(req.params.id)}, function(err, doc) {
    if(err) {
      handleError(res, err.message, "Failed to get runner");
    }
    else {
      res.status(200).json(doc);
    }
  })

});

app.post('/runners/add', function(req, res) {
  var newRunner = req.body;
  newRunner.createDate = new Date();
  var firstName = newRunner.firstName;
  var lastName = newRunner.lastName;
  var email = newRunner.email;

  newRunner._id = email; // set unique index to email
  newRunner.uid = new ObjectID(); // but still generate a unique user id
  if(!(email || firstName)) {
    handleError(res, "Invalid input", "Must provide a first name and email", 400);
  }

  db.collection(RUNNERS_COLLECTION).insertOne(newRunner, function(err, doc) {
    if(err) {
      handleError(res, err.message, "Failed to create new runner");
    }
    else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.put('/runners/update/:id', function(req, res) {
  var updateDoc = {$set: req.body}; // $set tells mongodb to update only the fields specified, not to overwrite the entire rec
  db.collection(RUNNERS_COLLECTION).updateOne({uid: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if(err) {
      handleError(res, err.message, "Failed to update runner");
    }
    else {
      res.status(204).end();
    }
  });
});

app.delete('/runners/remove/:id', function(req, res) {
  db.collection(RUNNERS_COLLECTION).deleteOne({uid: new ObjectID(req.params.id)}, function(err, doc) {
    if(err) {
      handleError(res, err.message, "Failed to delete runner");
    }
    else {
      res.status(204).end();
    }
  });
});


