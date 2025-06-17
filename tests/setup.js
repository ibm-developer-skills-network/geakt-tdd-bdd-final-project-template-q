const { sequelize, initializeDatabase } = require('../src/database/connection');
require('../src/models/product'); // Import model to ensure it's registered with Sequelize

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/postgres_test';

// Global test setup
beforeAll(async () => {
  await initializeDatabase();
});


// Clean up after all tests
afterAll(async () => {
  await sequelize.close();
  console.log('Test database connection closed');
});

// Global test timeout
jest.setTimeout(30000);