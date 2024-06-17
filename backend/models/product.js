const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

class Product {
  constructor(name, description, price, category, sellerId, imageUrl) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.seller_id = sellerId;
    this.image_url = imageUrl;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(product) {
    const id = uuidv4();
    await db.collection('products').doc(id).set({ ...product, id });
    return id;
  }
  
  static async findById(id) {
    const product = await db.collection('products').doc(id).get();
    return product.exists ? product.data() : null;
  }

  static async findByCategory(category) {
    const productsSnapshot = await db.collection('products').where('category', '==', category).get();
    return productsSnapshot.docs.map(doc => doc.data());
  }

  static async findAll() {
    const productsSnapshot = await db.collection('products').get();
    return productsSnapshot.docs.map(doc => doc.data());
  }

  static async update(id, product) {
    const productRef = db.collection('products').doc(id);
    await productRef.update({ ...product, updated_at: new Date() });
    return true;
  }

  static async findByName(name) {
    const productSnapshot = await db.collection('products').where('name', '==', name).get();
    return productSnapshot.empty ? null : productSnapshot.docs[0].data();
  }

  static async findBySellerId(sellerId) {
    const productsSnapshot = await db.collection('products').where('seller_id', '==', sellerId).get();
    return productsSnapshot.docs.map(doc => doc.data());
  }

  static async delete(id) {
    await db.collection('products').doc(id).delete();
    return true;
  }
}

module.exports = Product;
