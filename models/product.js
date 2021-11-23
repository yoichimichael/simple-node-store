const { getDb } = require('../helpers/database');

class Product {
  constructor({ title, price, description, imageUrl }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.iamgeUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(console.log)
      .catch(console.log)
  }
}

module.exports = Product;