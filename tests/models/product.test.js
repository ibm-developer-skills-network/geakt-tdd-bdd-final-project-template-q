const { Product, Category } = require('../../src/models/product');
const { ProductFactory } = require('../factories');

describe('Product Model', () => {

  beforeEach(async () => {
    // Clean the Products table before each test
    await Product.destroy({
      where: {},
      truncate: true,      // Truncates the table (deletes all rows)
      cascade: true,       // Ensures cascading deletes if there are foreign key constraints
      force: true,         // Allows truncate even with foreign key constraints (use with caution)
      restartIdentity: true // For PostgreSQL, resets auto-incrementing primary key sequences
    });
  });
  
  describe('Product Creation', () => {
    test('should create a product and assert that it exists', () => {
      const productData = {
        name: 'Fedora',
        description: 'A red hat',
        price: 12.50,
        available: true,
        category: Category.CLOTHS
      };
      
      const product = new Product(productData);
      
      expect(product).toBeDefined();
      expect(product.id).toBeNull(); // Not saved yet
      expect(product.name).toBe('Fedora');
      expect(product.description).toBe('A red hat');
      expect(product.available).toBe(true);
      expect(product.price).toBe(12.50);
      expect(product.category).toBe(Category.CLOTHS);
    });
    
    test('should add a product to the database', async () => {
      // Check database is empty
      const products = await Product.findAll();
      expect(products).toEqual([]);
      
      // Create product using factory
      const productData = ProductFactory.build();
      delete productData.id; // Remove ID so database assigns one
      
      const product = await Product.create(productData);
      
      // Assert that it was assigned an id and shows up in the database
      expect(product.id).toBeDefined();
      
      const allProducts = await Product.findAll();
      expect(allProducts.length).toBe(1);
      
      // Check that it matches the original product
      const newProduct = allProducts[0];
      expect(newProduct.name).toBe(productData.name);
      expect(newProduct.description).toBe(productData.description);
      expect(parseFloat(newProduct.price)).toBe(productData.price);
      expect(newProduct.available).toBe(productData.available);
      expect(newProduct.category).toBe(productData.category);
    });
  });
  
  //
  // ADD YOUR TEST CASES HERE
  //

  

  

  
  
});