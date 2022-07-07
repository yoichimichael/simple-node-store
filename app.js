const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');

const { MONGODB_PASS, MONGODB_USER, MONGODB_DB_NAME, PORT } = process.env;
const errorsController = require('./controllers/errors');
const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.38pbq.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection = csurf();

const fileStorage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

app.set('view engine', 'ejs');
app.set('views', 'views');

// LOCAL ROUTE IMPORTS
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(helmet());
app.use(compression());

// parses ALL incoming request bodies
// automatically calls next()
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
// instructs where to look for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
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
  console.log(error);
  res.status(500).render('500', { 
    pageTitle: 'Error!', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT || 3000);
  })
  .catch(console.log);