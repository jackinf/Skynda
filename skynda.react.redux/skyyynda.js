const express = require('express');
const path = require('path');
const cors = require('cors');
const port = 80; //process.env.PORT || 3000;
const app = express();

const whitelist = ['http://triven.eu'];
const corsOptions = {
  origin: function(origin, callback){
    if (!origin) {
      callback(null, true);
      return;
    }
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(origin && originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};

//enable cors
app.use(cors(corsOptions));

// Alternative way
// //enable cors
// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(port);
console.log("server started on port " + port);
