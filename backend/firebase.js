const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;

"backend/firebaseKey.json"
