const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    isAuthenticated: false
  });
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
}

exports.postLogin = (req, res, next) => {
  User.findById('61ba1a8f55a4d2f152617864')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;

      // wrapping the redirect within save() ensures the session has been set in the db BEFORE the redirect occurs
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
      
    })
    .catch(console.log);
}

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }

      const user = new User({
        email,
        password,
      })
    })
    .catch(console.log);

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}