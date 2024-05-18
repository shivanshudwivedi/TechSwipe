const tf = require('@tensorflow/tfjs-node');

class RecommendationModel {
  constructor() {
    this.model = null;
  }

  async train(products, userPreferences) {
    const productFeatures = products.map((product) => [
      product.category,
      product.price,
    ]);

    const userFeatures = userPreferences.map((preference) => [preference]);

    const productTensor = tf.tensor2d(productFeatures);
    const userTensor = tf.tensor2d(userFeatures);

    const outputTensor = tf.ones([userFeatures.length, 1]);

    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({
        inputShape: [2],
        units: 16,
        activation: 'relu',
      })
    );
    this.model.add(
      tf.layers.dense({
        units: 1,
        activation: 'sigmoid',
      })
    );

    this.model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy'],
    });

    await this.model.fit(productTensor, outputTensor, {
      epochs: 100,
      batchSize: 32,
    });
  }

  async predict(products, userPreferences) {
    const productFeatures = products.map((product) => [
      product.category,
      product.price,
    ]);

    const productTensor = tf.tensor2d(productFeatures);
    const userTensor = tf.tensor2d(userPreferences);

    const predictions = await this.model.predict(productTensor).data();

    const recommendedProducts = products.filter((_, index) => predictions[index] > 0.5);

    return recommendedProducts;
  }
}

module.exports = RecommendationModel;