const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoDbPass = process.env.MONGO_DB_PASS;

const mongoConnect = (callback) => {
  MongoClient.connect(`mongodb+srv://yoichi:${mongoDbPass}@cluster0.38pbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(client => {
    console.log("CONNECTED!");
    callback(client);
  })
  .catch(console.log)
}

module.exports = mongoConnect;