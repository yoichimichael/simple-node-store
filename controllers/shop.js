const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', { 
        pageTitle: 'All Products', 
        prods: products, 
        path: '/products'
      });
    }).catch(console.log);
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', { 
        product,
        pageTitle: product.title, 
        path: '/products' 
      })
    })
    .catch(console.log);
}

exports.getIndex = (req, res, next) => {
  Product
    .find()
    .then(products => {
      res.render('shop/index', { 
        pageTitle: 'Shop', 
        prods: products, 
        path: '/'
      });
    })
    .catch(console.log);
}

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      console.log("items:", user.cart.items);
      const products = user.cart.items.map(i => ({
          title: i.productId.title,
          quantity: i.quantity,
          _id: i.productId._id
      }));
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(console.log);
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      const user = req.user;
      return user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(console.log);
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(console.log);
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => ({        
        product: { ...i.productId._doc },
        quantity: i.quantity
      }));
      const order = new Order({
        products,
        user: {
          name: req.user.name,
          userId: req.user
        }
      });
      return order.save();
    })
    .then(results => {
      res.redirect('/orders');
    })
    .catch(console.log) 
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(console.log)
  
}