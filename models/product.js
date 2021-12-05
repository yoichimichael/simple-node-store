const mongoose = require('require');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});


// const { ObjectId } = require('mongodb')
// const { getDb } = require('../helpers/database');

// class Product {
//   constructor({ title, price, description, imageUrl, _id, userId }) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = _id ? new ObjectId(_id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       console.log('id on object found')
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this })
//     } else {
//       dbOp = db
//         .collection('products')
//         .insertOne(this)
//     }
    
//     return dbOp
//       .then(console.log)
//       .catch(console.log)
//   }

//   static fetchAll(){
//     const db = getDb();
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(console.log); 
//   }

//   static findById(prodId){
//     const db = getDb();
//     return db.collection('products')
//       .findOne({ _id: new ObjectId(prodId) })
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(console.log);
//   }

//   static deleteById(prodId){
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(prodId)})
//       .then(() => console.log("Product Deleted From Collection"))
//       .catch(console.log);
//   }
// }

// module.exports = Product;