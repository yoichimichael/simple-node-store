// CORE MODULES
// const http = require('http'); // not needed because Express calls on the module itself

// 3RD PARTY PACKAGES

// variable 'express' is a top level function
const express = require('express');

// const bodyParser = require('body-parser');

// LOCAL IMPORTS
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// variable 'app' can be named anything
// express() returns a top level management object
// app can be passed 
const app = express();

/*
// example use of next()
app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); // allows request to continue to next middleware
})
*/

// app.use('/', (req, res, next) => {
//   // console.log('This always runs!');
//   next();
// })

// parses ALL incoming request bodies
// automatically calls next()
app.use(express.urlencoded({extended: false}));

// first middleware with route specifi
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>')
});

// CREATE AND START SERVER
/*
// no longer need becuase of Express app methods
const server = http.createServer(app);
server.listen(3000);
*/

// instead of the above:
app.listen(3000);
