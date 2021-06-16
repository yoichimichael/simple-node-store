const path = require('path');

const express = require('express');

// const rootDir = require('../helpers/path');

const productsController = require('../controllers/products');

const router = express.Router();

const products = [];

// '/admin/add-product'=> GET
// router.get('/add-product', (req, res, next) => {
//   // res.send(
//   //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   // );
  
//   // used __dirname previously instead of importing rootDir
//   res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
// })

router.get('/add-product', productsController.getAddProduct);

// '/admin/add-product' => POST
router.post('/add-product', productsController.postAddProduct);

exports.routes = router;
exports.products = products;

// module.exports = router;