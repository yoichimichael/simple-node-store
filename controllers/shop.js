const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', { 
      pageTitle: 'All Products', 
      prods: products, 
      path: '/products'
    });
  }).catch(console.log);
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  Product.findById(prodId).then(product => {
    res.render('shop/product-detail', { 
      product,
      pageTitle: product.title, 
      path: '/products' 
    })
  }).catch(console.log);
}

exports.getIndex = (req, res, next) => {
  Product
    .fetchAll()
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
  Product.findById(prodId)
    .then(product => {
      const user = req.user;
      return user.addToCart(product);
    })
    .then(result => {
      console.log("this is result of updating a collection: ", result);
    })
    .catch(console.log) 
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts( { where: { id: prodId } }); 
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1; 
  //       return product;
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, { 
  //       through: { quantity: newQuantity } 
  //     });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');       
  //   })
  //   .catch(console.log);
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(console.log);
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .then(result => {
          return fetchedCart.setProducts(null);
        })
        .then(results => {
          res.redirect('/orders');
        })
        .catch(console.log)
    })
    .catch(console.log)
}

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(console.log)
  
}