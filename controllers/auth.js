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
  const { email, password } = req.body;
  let user;
  User.find({ email: email })
    .then(user => {
      user = user;
    })
    .catch(console.log);
  // isLoggedIn property is custom; a property of any name can be added to the session object
  if (user)
    req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect('/');
}