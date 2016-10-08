// var express = require('express');
// var app = express();
// app.use('/', express.static(__dirname + '/dist')); // ? adjust
// app.listen(3000, function() { console.log('listening'); });

const express = require('express');
const exec = require('child_process').exec;
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});

pmx.action('hello:world', function(reply) {
  reply({success : true});
});

pmx.action('deploy:prod', function(reply) {
  exec('deploy-skynda.sh', (error, stdout, stderr) => {
    if (error) {
      reply({success: false, error: error});
    } else {
      reply({success : true});
    }
  });
});

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(port);
console.log("server started on port " + port);
