const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

// // '/admin/products'=> GET
router.get('/products', isAuth, adminController.getProducts);

// // '/admin/add-product' => POST
router.post(
  '/add-product', 
  [
    body(
      'title',
      'Title may only contain letters and numbers and must be at least 3 characters long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body(
      'imageUrl',
      'URL must be valid'
    )
      .isURL(),
    body(
      'price',
      'Price must include cents value'
    )
      .isFloat(),
    body(
      'description', 
      'Description of minimum length of 3 characters and maximum length of 400 characters required'
    )
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth, adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product', 
  [
    body(
      'title',
      'Title may only contain letters and numbers and must be at least 3 characters long')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body(
      'imageUrl',
      'URL must be valid'
    )
      .isURL(),
    body(
      'price',
      'Price must include cents value'
    )
      .isFloat(),
    body(
      'description', 
      'Description of minimum length of 3 characters and maximum length of 400 characters required'
    )
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth, adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;