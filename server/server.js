var express = require('express');
var bodyParser = require('body-parser');
var initializeDB = require('./db/connection').initializeDB;

var app = express();
var port = process.env.PORT || 3000;

var index = require('./routes/index');
var list = require('./routes/list');

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.use('/', index);
app.use('/list', list);

initializeDB();


app.listen(port, function() {
  console.log('listening on port', port);
});
