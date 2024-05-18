const { ObjectId } = require('mongodb');

class Order {
  constructor(userId, items, totalAmount, status) {
    this.user_id = userId;
    this.items = items;
    this.total_amount = totalAmount;
    this.status = status;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(db, order) {
    const result = await db.collection('orders').insertOne(order);
    return result.insertedId;
  }

  static async findById(db, id) {
    const order = await db.collection('orders').findOne({ _id: ObjectId(id) });
    return order;
  }

  static async findByUserId(db, userId) {
    const orders = await db.collection('orders').find({ user_id: ObjectId(userId) }).toArray();
    return orders;
  }

  static async findAll(db) {
    const orders = await db.collection('orders').find({}).toArray();
    return orders;
  }

  static async updateStatus(db, id, status) {
    const result = await db.collection('orders').updateOne(
      { _id: ObjectId(id) },
      { $set: { status: status, updated_at: new Date() } }
    );
    return result.modifiedCount;
  }
}

module.exports = Order;