const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({ 
    title, 
    price, 
    imageUrl, 
    description,
    userId: req.user // with relations setup, mongoose will only assign id, not full object
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).render('admin/edit-product', { 
      pageTitle: 'Add Product', 
      path: '/admin/edit-product',
      editing: false,
      hasError: true,
      product: {
        title,
        imageUrl,
        price,
        description,
      },
      errorMessage: errors.array()[0].msg
    });
  }

  product 
    .save()
    .then(result => {
      console.log('Created A New Product');
      res.redirect('/admin/products');
    })
    .catch(console.log);  
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', { 
        pageTitle: 'Edit Product', 
        path: '/admin/edit-product',
        editing: editMode,
        hasError: false,
        product,
        errorMessage: null
      });
    })
    .catch(console.log);
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, price, imageUrl, description } = req.body;  
  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product
        .save()
        .then(() => res.redirect('/admin/products'))
    })
    .catch(console.log);
  
};

exports.getProducts = (req, res, next) => {
  Product
    .find({ userId: req.user._id })
    .then(products => {
      console.log(products);
      res.render('admin/products', { 
        prods: products, 
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(console.log);
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product
    .deleteOne({ _id: prodId, userId: req.user._id })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(console.log);
}