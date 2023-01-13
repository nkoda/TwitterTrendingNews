const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config()

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_CONNECT
    )
    .then(client => {
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'no database connected';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;