const express = require('express');
const { check, body } = require('express-validator');
const { isValidObjectId } = require('mongoose');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup', 
	[
		check('email')
    	.isEmail()
    	.withMessage('Please enter a valid email.')
			.custom(( value, { req } ) => {
				return User.findOne({ email: value })
					.then(userDoc => {
						if (userDoc) {
							return Promise.reject('E-mail already used, please pick a new one');
						}
					}) 
			}),
		body(
			'password',
			'Please enter password using only numbers and text with at least 5 characters'
		)
			.isLength({ min: 5 })
			.isAlphanumeric(),
		body('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords have to match');
			}
			return true;
		})
	],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset-password', authController.getReset);

router.post('/reset-password', authController.postReset);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;