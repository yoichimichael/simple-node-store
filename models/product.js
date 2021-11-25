const { ObjectId } = require('mongodb')
const { getDb } = require('../helpers/database');

class Product {
  constructor({ title, price, description, imageUrl, _id}) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new ObjectId(_id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      console.log('id found')
      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db
        .collection('products')
        .insertOne(this)
    }
    
    return dbOp
      .then(console.log)
      .catch(console.log)
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(console.log); 
  }

  static findById(prodId){
    const db = getDb();
    return db.collection('products')
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(console.log);
  }
}

module.exports = Product;