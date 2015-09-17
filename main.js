var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var Context = require('./context.js');

var config = require('./config.json');
var app = express();

var functions = {};
for (var func in config) {
  if (config.functions.hasOwnProperty(func)) {
    functions[func] = require(config[func]);
  }
}

// AWS ruby gem doesn't set content-type header and body-parser won't set the
// request body if there's no content-type.
app.use(function defaultContentTypeMiddleware(req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json';
  next();
});

app.use(bodyParser.json());

app.post('/2015-03-31/functions/:name/invocations', function(req, res) {
  var pathname = config.functions[req.params.name];
  var dirname = path.dirname(pathname);
  process.chdir(dirname);
  functions[req.params.name].handler(req.body, new Context(res));
});

var server = app.listen(3333, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Church is listening at http://%s:%s', host, port);
});
