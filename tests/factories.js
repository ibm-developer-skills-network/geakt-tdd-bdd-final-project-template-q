const { faker } = require('@faker-js/faker');
const { Product, Category } = require('../src/models/product');

/**
 * Factory to create fake products for testing
 */
class ProductFactory {
  /**
   * Build a single product with fake data
   * @param {Object} overrides - Properties to override
   * @returns {Object} Product data
   */
  static build(overrides = {}) {
    const product = {
      id: faker.datatype.number({ min: 1, max: 1000 }),
      // ADD YOUR CODE HERE TO CREATE FAKE PRODUCTS
      // Use faker to generate fake data for name, description, price, available, category
    };
    
    return Object.assign(product, overrides);
  }
  
  /**
   * Build multiple products
   * @param {number} count - Number of products to create
   * @param {Object} overrides - Properties to override for all products
   * @returns {Array} Array of product data
   */
  static buildList(count, overrides = {}) {
    return Array.from({ length: count }, () => this.build(overrides));
  }
  
  /**
   * Create and save a product to the database
   * @param {Object} overrides - Properties to override
   * @returns {Promise<Product>} Created product instance
   */
  static async create(overrides = {}) {
    const productData = this.build(overrides);
    delete productData.id; // Let database assign ID
    return await Product.create(productData);
  }
  
  /**
   * Create and save multiple products to the database
   * @param {number} count - Number of products to create
   * @param {Object} overrides - Properties to override for all products
   * @returns {Promise<Array>} Array of created product instances
   */
  static async createList(count, overrides = {}) {
    const products = [];
    for (let i = 0; i < count; i++) {
      const product = await this.create(overrides);
      products.push(product);
    }
    return products;
  }
}

module.exports = { ProductFactory };