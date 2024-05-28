const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

class Seller {
  constructor(name, email, password, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(seller) {
    const id = uuidv4();
    await db.collection('sellers').doc(id).set({ ...seller, id });
    return id;
  }

  static async findById(id) {
    const seller = await db.collection('sellers').doc(id).get();
    return seller.exists ? seller.data() : null;
  }

  static async findByEmail(email) {
    const sellerSnapshot = await db.collection('sellers').where('email', '==', email).get();
    return sellerSnapshot.empty ? null : sellerSnapshot.docs[0].data();
  }

  static async findAll() {
    const sellersSnapshot = await db.collection('sellers').get();
    return sellersSnapshot.docs.map(doc => doc.data());
  }
}

module.exports = Seller;
