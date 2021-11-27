require('dotenv').config();
const path = require('path');

const express = require('express');

const errorsController = require('./controllers/errors');
const { mongoConnect } = require('./helpers/database');
const User = require('./models/user');

// DEPRECATED - urlencoded() and static() are now part of the express object
// const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// LOCAL ROUTE IMPORTS
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parses ALL incoming request bodies
// automatically calls next()
app.use(express.urlencoded({extended: false}));
// instructs where to look for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user; 
      next();
    })
    .catch(console.log);
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// ERROR HANDLER
app.use(errorsController.getPageNotFound);

mongoConnect(() => {
  app.listen(3000);
})