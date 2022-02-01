require('dotenv').config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const mongoDbPass = process.env.MONGO_DB_PASS;
const errorsController = require('./controllers/errors');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://yoichi:${mongoDbPass}@cluster0.38pbq.mongodb.net/simple_node_store?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection = csurf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
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
app.use(multer({ storage: fileStorage }).single('image'));
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
//CSRF protection middleware
app.use(csrfProtection);
//flash middleware 
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// ERROR HANDLERS
app.get('/500', errorsController.get500);
// catch-all error handler
app.use(errorsController.getPageNotFound);
// gets executed when a next() call within a middleware function gets passed an error object 
app.use((error, req, res, next) => {
  res.status(500).render('500', { 
    pageTitle: 'Error!', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch(console.log);