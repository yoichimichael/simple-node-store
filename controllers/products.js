const products = [];

exports.getAddProduct = (req, res, next) => {
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  // );
  
  // used __dirname previously instead of importing rootDir
  
  res.render('add-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true 
  });
}

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title })
  res.redirect('/');
}

exports.products = products;