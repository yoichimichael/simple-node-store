const db = require('../helpers/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor({id, title, imageUrl, description, price}){
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
  }

  static deleteById(id) {
    
  }

  static fetchAll(){
    db.then(client => {
      client
          .query('SELECT * FROM products')
          .then(res => {
            client.release() 
            console.log(res.rows)
          })
          .catch(err => {
            client.release()
            console.log(err.stack)
          })
    })
  }

  static findById(id){
    
  }
}