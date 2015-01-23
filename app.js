var express = require('express');
var morgan = require('morgan');

var app = express();
app.listen(3000);
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"))

app.get('/', function(req, res, next){
	res.send("Hello World");
})

