const { ObjectId } = require('mongodb');

class Seller {
  constructor(name, email, password, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(db, seller) {
    const result = await db.collection('sellers').insertOne(seller);
    return result.insertedId;
  }

  static async findById(db, id) {
    const seller = await db.collection('sellers').findOne({ _id: ObjectId(id) });
    return seller;
  }

  static async findByEmail(db, email) {
    const seller = await db.collection('sellers').findOne({ email: email });
    return seller;
  }

  static async findAll(db) {
    const sellers = await db.collection('sellers').find({}).toArray();
    return sellers;
  }
}

module.exports = Seller;