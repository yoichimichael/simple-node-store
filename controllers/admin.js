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
  const product = new Product({title, price, imageUrl, description});
  product 
    .save()
    .then(result => {
      console.log('Created Product');
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
        product
      });
    })
    .catch(console.log);
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, price, imageUrl, description } = req.body;
  
  const product = new Product({ 
    title, 
    price, 
    imageUrl, 
    description, 
    _id: prodId, 
  });
  product.save()
    .then(() => {res.redirect('/admin/products')})
    .catch(console.log);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', { 
        prods: products, 
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(console.log);
}

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       res.redirect('/admin/products');
//     })
//     .catch(console.log);
// }