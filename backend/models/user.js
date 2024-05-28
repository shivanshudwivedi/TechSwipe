const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(name, email, password, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(user) {
    const id = uuidv4();
    await db.collection('users').doc(id).set({ ...user, id });
    return id;
  }

  static async findByEmail(email) {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    return userSnapshot.empty ? null : userSnapshot.docs[0].data();
  }

  static async findById(id) {
    const user = await db.collection('users').doc(id).get();
    return user.exists ? user.data() : null;
  }

  static async update(id, user) {
    const userRef = db.collection('users').doc(id);
    await userRef.update({ ...user, updated_at: new Date() });
    return true;
  }

  static async delete(id) {
    await db.collection('users').doc(id).delete();
    return true;
  }
}

module.exports = User;
