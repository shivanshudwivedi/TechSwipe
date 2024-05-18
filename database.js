const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db('electronics_db');
  await createIndexes(db);
  return db;
}

async function createIndexes(db) {
  // Create indexes for User collection
  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  // Create indexes for Product collection
  await db.collection('products').createIndex({ name: 1 });
  await db.collection('products').createIndex({ category: 1 });
  await db.collection('products').createIndex({ seller_id: 1 });

  // Create indexes for Seller collection
  await db.collection('sellers').createIndex({ email: 1 }, { unique: true });

  // Create indexes for Order collection
  await db.collection('orders').createIndex({ user_id: 1 });
  await db.collection('orders').createIndex({ status: 1 });
}

module.exports = connect;