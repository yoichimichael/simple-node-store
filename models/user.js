const { ObjectId } = require('mongodb');
const { getDb } = require('../helpers/database');

class User {
  constructor({name, email, cart, _id}) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
  }

  addToCart(product) {
    //  const cartProduct = this.cart.items.findIndex(cp => {
    //    return cp._id === product._id;
    //  });
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId){
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
  }
}

module.exports = User;