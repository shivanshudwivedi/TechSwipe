const { ObjectId } = require('mongodb');

class Product {
  constructor(name, description, price, category, sellerId) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.seller_id = sellerId;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(db, product) {
    const result = await db.collection('products').insertOne(product);
    return result.insertedId;
  }

  static async findById(db, id) {
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
  }

  static async findByCategory(db, category) {
    const products = await db.collection('products').find({ category: category }).toArray();
    return products;
  }

  static async findAll(db) {
    const products = await db.collection('products').find({}).toArray();
    return products;
  }

  static async update(db, id, product) {
    const result = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: product });
    return result.modifiedCount;
  }

  static async findbyName(db, name) {
    const product = await db.collection('products').findOne({ name: name });
    return product;
  }

  static async findBySellerId(db, sellerId) {
    const products = await db.collection('products').find({ seller_id: ObjectId(sellerId) }).toArray();
    return products;
  }
  
  static async delete(db, id) {
    const result = await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
  }

}

module.exports = Product;