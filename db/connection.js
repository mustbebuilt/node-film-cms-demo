const { MongoClient } = require('mongodb');

const {
    MONGO_HOST,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DBNAME,
    MONGO_LOCAL,
} = process.env;

let MONGO_URI = 'mongodb+srv://'+MONGO_USERNAME+':'+MONGO_PASSWORD+'@'+MONGO_HOST+'/'+MONGO_DBNAME+'?authSource=admin';

if (MONGO_LOCAL === 'true') {
  MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
}

console.log(MONGO_URI);

const client = new MongoClient(MONGO_URI);
const db = client.db();

module.exports = {
    client,
    db,
  };