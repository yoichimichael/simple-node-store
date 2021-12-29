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
  // isLoggedIn property is custom; a property of any name can be added to the session object
  req.session.isLoggedIn = true;
  res.redirect('/');
}