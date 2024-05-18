const { ObjectId } = require('mongodb');

class User {
  constructor(name, email, password, address) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(db, user) {
    const result = await db.collection('users').insertOne(user);
    return result.insertedId;
  }

  static async findById(db, id) {
    const user = await db.collection('users').findOne({ _id: ObjectId(id) });
    return user;
  }

  static async findByEmail(db, email) {
    const user = await db.collection('users').findOne({ email: email });
    return user;
  }

  static async findAll(db) {
    const users = await db.collection('users').find({}).toArray();
    return users;
  }

  static async update(db, id, user) {
    const result = await db.collection('users').updateOne(
      { _id: ObjectId(id) },
      { $set: { ...user, updated_at: new Date() } }
    );
    return result.modifiedCount;
  }
  
  static async delete(db, id) {
    const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
  }


}



module.exports = User;