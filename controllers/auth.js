exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split('=')[1];
  console.log(isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    isAuthenticated: (isLoggedIn === 'true' ? true : false)
  });
}

exports.postLogin = (req, res, next) => {
  res.set('Set-Cookie', 'loggedIn=true; HttpOnly');
  res.redirect('/');
}