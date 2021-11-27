const { ObjectId } = require('mongodb')
const { getDb } = require('../helpers/database');

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
  }

  static findById(userId){
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      // .then(user => {
      //   console.log(user);
      //   return user;
      // })
      // .catch(console.log);
  }
}

module.exports = User;