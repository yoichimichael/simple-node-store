require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoDbPass = process.env.MONGO_DB_PASS;
const errorsController = require('./controllers/errors');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://yoichi:${mongoDbPass}@cluster0.38pbq.mongodb.net/simple_node_store?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

// LOCAL ROUTE IMPORTS
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// parses ALL incoming request bodies
// automatically calls next()
app.use(express.urlencoded({extended: false}));
// instructs where to look for static files
app.use(express.static(path.join(__dirname, 'public')));
// session middleware with options
app.use(
  session({ 
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  User.findById('61ba1a8f55a4d2f152617864')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log);
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// ERROR HANDLER
app.use(errorsController.getPageNotFound);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Yoichi',
            email: 'ynagano@pm.me',
            cart: {
              items: []
            }
          });
          user.save();
        }
      })
    app.listen(3000);
  })
  .catch(console.log);