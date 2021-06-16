// core module
const path = require('path');

const express = require('express');

const rootDir = require('../helpers/path');
const productsData = require('../controllers/products');

const router = express.Router();

// SENDING A STATIC FILE
// router.get('/', (req, res, next) => {
//   console.log('shop.js: ',adminData.products);
//   // res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
//   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

// RENDERING A TEMPLATE
router.get('/', (req, res, next) => {
  const products = productsData.products;
  res.render('shop', { 
    pageTitle: 'Shop', 
    prods: products, 
    path: '/', 
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;