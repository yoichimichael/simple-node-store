require('dotenv').config();
const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.getLogin = (req, res, next) => {
  const message = req.flash('error')[0];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login Orders',
    errorMessage: message,
  });
}

exports.getSignup = (req, res, next) => {
  const message = req.flash('error')[0];
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
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
          req.flash('error', 'Invalid email or password');
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
      if (userDoc) {
        req.flash('error', 'E-mail already used, please pick a new one');
        return res.redirect('/signup');
      }

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
          return sgMail
            .send({
              to: email,
              from: 'ynagano@pm.me',
              subject: 'Signup Succeeded!',
              html: '<h1>You successfully signed up!</h1>'
            })
            .then(() => {
              console.log('email sent');
            })
        })
        .catch(console.log);
    })
    .catch(console.log);

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
}

exports.getReset = (req, res, next) => {
  const message = req.flash('error')[0];
  res.render('auth/reset-password', {
    path: '/reset-password',
    pageTitle: 'Reset Password',
    errorMessage: message,
  });
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset-password');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        return sgMail
          .send({
            to: req.body.email,
            from: 'ynagano@pm.me',
            subject: 'Password reset',
            html: `
              <p>You requested a password reset.</p>
              <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password.</p>
            `
          })
      })
      .catch(console.log)
  })
}

exports.getNewPassord = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ 
    resetToken: token, 
    resetTokenExpiration: { $gt: Date.now() } 
  })
  .then(user => {
    const message = req.flash('error')[0];
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'New Password',
      errorMessage: message,
      userId: user._id.toString()
    });
  })
  .catch(console.log)

  
}