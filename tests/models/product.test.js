const { Product, Category } = require('../../src/models/product');
const { sequelize } = require('../../src/database/connection');
const { ProductFactory } = require('../factories');

describe('Product Model', () => {


  
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

  describe('Product Model - Read', () => {
    test('should read a product', async () => {
        const productData = ProductFactory.build();
        delete productData.id;
        
        const savedProduct = await Product.create(productData);
        expect(savedProduct.id).toBeDefined();
        
        // Fetch it back
        const foundProduct = await Product.findByPk(savedProduct.id);
        expect(foundProduct.id).toBe(savedProduct.id);
        expect(foundProduct.name).toBe(productData.name);
        expect(foundProduct.description).toBe(productData.description);
        expect(parseFloat(foundProduct.price)).toBe(productData.price);
      });
  });

  test('should update a product', async () => {
    const productData = ProductFactory.build();
    delete productData.id;
    
    const savedProduct = await Product.create(productData);
    expect(savedProduct.id).toBeDefined();
    
    // Change it and save it
    savedProduct.description = "testing";
    const originalId = savedProduct.id;
    await savedProduct.save();
    
    expect(savedProduct.id).toBe(originalId);
    expect(savedProduct.description).toBe("testing");
    
    // Fetch it back and make sure the id hasn't changed
    // but the data did change
    const foundProduct = await Product.findByPk(originalId);
    expect(foundProduct.id).toBe(originalId);
    expect(foundProduct.description).toBe("testing");
  });


  test('should delete a product', async () => {

    const productsAfterInitialClean = await Product.findAll();


    const { id, ...dataToCreate } = ProductFactory.build();

    // delete productData.id; // Replaced by destructuring above
    
    const savedProduct = await Product.create(dataToCreate);


    // await new Promise(resolve => setTimeout(resolve, 0)); // Micro-delay removed
    let products = await Product.findAll();

    expect(products.length).toBe(1);
    
    // delete the product and make sure it isn't in the database

    await savedProduct.destroy();
    products = await Product.findAll();

    expect(products.length).toBe(0);
  });

  test('should list all products in the database', async () => {
    let products = await Product.findAll();
    expect(products.length).toBe(0);
    
    // Create 5 Products
    for (let i = 0; i < 5; i++) {
      const productData = ProductFactory.build();
      delete productData.id;
      await Product.create(productData);
    }
    
    // See if we get back 5 products
    products = await Product.findAll();
    expect(products.length).toBe(5);
  });

  test('should find a product by name', async () => {
    const products = await ProductFactory.createList(5);
    const name = products[0].name;
    const count = products.filter(product => product.name === name).length;
    
    const found = await Product.findByName(name);
    expect(found.length).toBe(count);
    
    for (const product of found) {
      expect(product.name).toBe(name);
    }
  });

  test('should find products by availability', async () => {
    const products = await ProductFactory.createList(10);
    const available = products[0].available;
    const count = products.filter(product => product.available === available).length;
    
    const found = await Product.findByAvailability(available);
    expect(found.length).toBe(count);
    
    for (const product of found) {
      expect(product.available).toBe(available);
    }
  });

  test('should find products by category', async () => {
    const products = await ProductFactory.createList(10);
    const category = products[0].category;
    const count = products.filter(product => product.category === category).length;
    
    const found = await Product.findByCategory(category);
    expect(found.length).toBe(count);
    
    for (const product of found) {
      expect(product.category).toBe(category);
    }
  });
  
});