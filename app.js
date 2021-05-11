const http = require('http');

const route = require('./routes');

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);