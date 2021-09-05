const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true 
  });
}

exports.postAddProduct = (req, res, next) => {
  // const {title, imageUrl, description, price} = req.body;
  // console.log(req.body);
  const product = new Product(req.body);
  // console.log(product.price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', { 
      prods: products, 
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}