const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({id: null, title, price, imageUrl, description});
  Product.create({
    title,
    price,
    imageUrl,
    description
  }).then(res => {
    // console.log(res);
    console.log('Created Product');
  }).catch(console.log);  
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  Product.findByPk(prodId).then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { 
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  }).catch(console.log);
}

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const { title, price, imageUrl, description } = req.body;
  Product.findByPk(id).then(product => {
    product.update({
      title,
      price,
      imageUrl,
      description
    }).then(() => {res.redirect('/admin/products')});
  }).catch(console.log);
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', { 
      prods: products, 
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(console.log);
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}