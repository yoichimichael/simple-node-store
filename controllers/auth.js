exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    isAuthenticated: req.isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect('/');
}