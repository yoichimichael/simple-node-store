const fs = require('fs');
const path = require('path');

const rootDir = require('../helpers/path');

const p = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(t){
    this.title = t;
  }

  save() {
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err); 
      })
    });
  }

  static fetchAll(cb){
    fs.readFile(p, (err, fileContent) => {
      if (err) cb([]);
      cb(JSON.parse(fileContent));
    });
  }
}