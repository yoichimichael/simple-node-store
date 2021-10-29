const db_pool = require('../helpers/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor({id, title, imageUrl, description, price}){
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const sqlQuery = 'INSERT INTO products(id, title, price, description, "imageUrl") VALUES(DEFAULT, $1, $2, $3, $4)';
    const values = [this.title, this.price, this.description, this.imageUrl];
    return db_pool.query(sqlQuery, values);
  }

  static deleteById(id) {
    
  }

  static fetchAll(){
    return db_pool.query('SELECT * FROM products');
  }

  static findById(id){
    return db_pool.query('SELECT * FROM products WHERE products.id = $1', [id]);
  }
}