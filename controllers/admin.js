const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  // const {title, imageUrl, description, price} = req.body;
  // console.log(req.body);
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(null, title, price, imageUrl, description);
  // console.log(product.price);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, price, imageUrl, description } = req.body;
  const updatedProduct = new Product(prodId, title, price, imageUrl, description);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', { 
      prods: products, 
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
}