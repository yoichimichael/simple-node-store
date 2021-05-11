// core modules
const http = require('http');

// 3rd party packages

// variable 'express' is a top level function
const express = require('express');

// variable 'app' can be named anything
// express() returns a top level management object
// app can be passed 
const app = express();

const server = http.createServer(app);

server.listen(3000);