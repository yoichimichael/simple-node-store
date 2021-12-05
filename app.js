require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

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
  User.findById('61a27a29587f327b0e1a52b9')
    .then(user => {
      req.user = new User({ 
        name: user.name, 
        email: user.email, 
        cart: user.cart, 
        _id: user._id 
      }); 
      next();
    })
    .catch(console.log);
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// ERROR HANDLER
app.use(errorsController.getPageNotFound);

mongoose.connect('');