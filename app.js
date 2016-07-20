var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient; // the official Node.js mongodb driver
var assert = require('assert');

var app = express();
app.use(bodyParser.json());

// db stuff
var url = 'mongodb://localhost:27017/runnerapi';
var RUNNERS_COLLECTION = "runners";
var db;

MongoClient.connect(url, function(err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }
  db = database;
  console.log('Database connection ready');

  var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Example app listening on port', port);
  });
});

app.get('/', function(req, res) {
  res.send('Hello World');
});

