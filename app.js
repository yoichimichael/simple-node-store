// core modules
// const http = require('http'); // not needed because Express calls on the module itself

// 3rd party packages

// variable 'express' is a top level function
const express = require('express');

// variable 'app' can be named anything
// express() returns a top level management object
// app can be passed 
const app = express();

app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); // allows request to continue to next middleware
})

app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
})

/*
// no longer need becuase of Express app methods
const server = http.createServer(app);
server.listen(3000);
*/

// instead of the above:
app.listen(3000);
