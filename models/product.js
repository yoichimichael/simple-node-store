const fs = require('fs');
const path = require('path');
// const { getProducts } = require('../controllers/products');

const rootDir = require('../helpers/path');

const p = path.join(rootDir, 'data', 'products.json');

// HELPER
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) return cb([]);
    cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor({id, title, imageUrl, description, price}){
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => {
          prod.id === this.id;
        });
      }
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err); 
      })
    });
  }

  static fetchAll(cb){
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }
}