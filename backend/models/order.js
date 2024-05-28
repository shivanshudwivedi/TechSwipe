const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

class Order {
  constructor(userId, items, totalAmount, status) {
    this.user_id = userId;
    this.items = items;
    this.total_amount = totalAmount;
    this.status = status;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(order) {
    const id = uuidv4();
    await db.collection('orders').doc(id).set({ ...order, id });
    return id;
  }

  static async findById(id) {
    const order = await db.collection('orders').doc(id).get();
    return order.exists ? order.data() : null;
  }

  static async findByUserId(userId) {
    const ordersSnapshot = await db.collection('orders').where('user_id', '==', userId).get();
    return ordersSnapshot.docs.map(doc => doc.data());
  }

  static async findAll() {
    const ordersSnapshot = await db.collection('orders').get();
    return ordersSnapshot.docs.map(doc => doc.data());
  }

  static async updateStatus(id, status) {
    const orderRef = db.collection('orders').doc(id);
    await orderRef.update({ status, updated_at: new Date() });
    return true;
  }
}

module.exports = Order;
