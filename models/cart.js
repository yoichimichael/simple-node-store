const fs = require('fs');
const path = require('path');

const rootDir = require('../helpers/path');
const p = path.join(
  rootDir, 
  'data', 
  'cart.json'
);

module.exports = class Cart {

  static addProduct(id, productPrice){
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find(prod => prod.id === id);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
      } else {
        updatedProduct = { id: id, qty: 1};
      }
      cart.totalPrice = cart.totalPrice + productPrice;
    }) 
  }
  
}