const path = require('path');

const express = require('express');

// const rootDir = require('../helpers/path');

const adminController = require('../controllers/admin');

const router = express.Router();

// '/admin/add-product'=> GET
// router.get('/add-product', (req, res, next) => {
//   // res.send(
//   //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
//   // );
  
//   // used __dirname previously instead of importing rootDir
//   res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
// })

router.get('/add-product', adminController.getAddProduct);

// '/admin/products'=> GET
router.get('/products', adminController.getProducts);

// '/admin/add-product' => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;