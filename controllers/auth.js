const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const message = req.flash('error')[0];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    errorMessage: message,
  });
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
  });
}

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password)
        .then(areMatching => {
          if (areMatching) {
            req.session.user = user;
            req.session.isLoggedIn = true;

            // wrapping the redirect within save() ensures the session has been set in the db BEFORE the redirect occurs
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login')
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login')
        });
    })
    .catch(console.log);
}

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;



  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) 
        return res.redirect('/signup');

      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] } 
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
    })
    .catch(console.log);

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}