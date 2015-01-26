//var express = require('express');
var tweetBank = require('../tweetBank');
//var io = require('socketio');
//var router = express.Router();
var nums = 'Yeah';

module.exports = function  (app, io) {
app.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'New App', tweets: tweets, showForm: false } );
});

app.get( '/users/:name/', function (req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(name);
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, name: name, tweets: list, showForm: true } );
  
});

app.get( '/users/:name/tweet/:id', function (req, res) {
  var id = req.params.id;
  var name = req.params.name;
  var tweet = tweetBank.find( {name: name, id: Number(id)} );
  res.render( 'index', { title: 'Tweet '+ id, tweets: tweet, showForm: false } );
});

app.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  var tweetId = tweetBank.find( {name: name, text: text});
  io.sockets.emit('new_tweet', { name: name, text: text, id: tweetId});
  res.redirect('/');
});
};