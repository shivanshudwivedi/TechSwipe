const db = require('../firebase');
const { v4: uuidv4 } = require('uuid');

class Cart {
  constructor(productId, quantity) {
    this.id = uuidv4();
    this.product_id = productId;
    this.quantity = quantity;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  toPlainObject() {
    return {
      id: this.id,
      product_id: this.product_id,
      quantity: this.quantity,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  static async findAll() {
    try {
      const cartSnapshot = await db.collection('cart').get();
      const cartItems = cartSnapshot.docs.map(doc => doc.data());
      return cartItems;
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      throw error;
    }
  }

  static async addItem(cartItem) {
    try {
      const { product_id, quantity } = cartItem;
      const cartItemRef = db.collection('cart').doc(cartItem.id);
      await cartItemRef.set(cartItem);
      return { id: cartItem.id, product_id, quantity };
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  static async updateQuantity(itemId, quantity) {
    try {
      const cartItemRef = db.collection('cart').doc(itemId);
      const cartItemSnapshot = await cartItemRef.get();
      if (!cartItemSnapshot.exists) {
        return null;
      }
      await cartItemRef.update({
        quantity,
        updated_at: new Date(),
      });
      const updatedItem = { id: itemId, ...cartItemSnapshot.data(), quantity };
      return updatedItem;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  }

  static async removeItem(itemId) {
    try {
      const cartItemRef = db.collection('cart').doc(itemId);
      await cartItemRef.delete();
      return { message: 'Cart item removed successfully' };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  static async clearCart() {
    try {
      const cartItemsSnapshot = await db.collection('cart').get();
      const batch = db.batch();
      cartItemsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

module.exports = Cart;
