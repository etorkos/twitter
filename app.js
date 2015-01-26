var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
//var tweet = require('./tweetBank');
var routes = require('./routes/');
var bodyParser = require('body-parser');
//var router = express.Router();
var socketio = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"))
app.use(express.static('public'));
//app.use('/', routes);
routes(app,io);

swig.setDefaults({ cache: false });


// app.get('/', function(req, res, next){
// 	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// })


app.engine('html', swig.renderFile );
app.set("view engine", 'html');
app.set("views",  './views');