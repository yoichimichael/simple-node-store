const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split('=')[1];
  // console.log(isLoggedIn);
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    isAuthenticated: false
  });
}

exports.postLogin = (req, res, next) => {
  User.findById('61ba1a8f55a4d2f152617864')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect('/');
    })
    .catch(console.log);
}