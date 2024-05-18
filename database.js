const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('electronics_db');
}

module.exports = connect;