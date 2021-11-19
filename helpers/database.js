const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoDbPass = process.env.MONGO_DB_PASS;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(`mongodb+srv://yoichi:${mongoDbPass}@cluster0.38pbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(client => {
    console.log("CONNECTED!");
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;