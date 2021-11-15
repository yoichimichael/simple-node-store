// CORE MODULE
// const path = require('path');

const express = require('express');

// const rootDir = require('../helpers/path');
const shopController = require('../controllers/shop');

const router = express.Router();

// SENDING A STATIC FILE
// router.get('/', (req, res, next) => {
//   console.log('shop.js: ',adminData.products);
//   // res.send('<h1>Hello from Express.js!</h1>')// auto sets 'Content-Type: text/html; charset=utf-8' in headers
//   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

// RENDERING A TEMPLATE
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);



module.exports = router;