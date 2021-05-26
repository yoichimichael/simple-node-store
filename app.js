// CORE MODULES
// const http = require('http'); // not needed because Express calls on the module itself
const path = require('path');

// 3RD PARTY PACKAGES

// variable 'express' is a top level function
const express = require('express');

// const bodyParser = require('body-parser');

// LOCAL IMPORTS
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// variable 'app' can be named anything
// express() returns a top level management object
// app can be passed 
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

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
// instructs where to look for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);

app.use(shopRoutes);

// ERROR HANDLER
app.use((req, res, next) => {
  // res.status(404).send('<h1>Page not found</h1>')
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// CREATE AND START SERVER
/*
// no longer need becuase of Express app methods
const server = http.createServer(app);
server.listen(3000);
*/

// instead of the above:
app.listen(3000);
