const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', { 
      pageTitle: 'All Products', 
      prods: products, 
      path: '/products'
    });
  }).catch(console.log);
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  Product.findByPk(prodId).then(product => {
    res.render('shop/product-detail', { 
      product,
      pageTitle: product.title, 
      path: '/products' 
    })
  }).catch(console.log);
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', { 
      pageTitle: 'Shop', 
      prods: products, 
      path: '/'
    });
  }).catch(console.log);
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts().then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products
        });        
      })
      .catch(console.log);
    })
    .catch(console.log);
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts( { where: { id: prodId } }); 
    })
    .then(products => {
      let product;
      if (products.length) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        // ...
      }
      return Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product, { 
            through: { quantity: newQuantity } 
          });
        })
        .catch(console.log)
    })
    .then(() => {
      res.redirect('/cart');       
    })
    .catch(console.log);
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}