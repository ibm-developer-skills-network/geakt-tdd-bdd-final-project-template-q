const { sequelize, resetDatabase } = require('../src/database/connection');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/postgres_test';

// Global test setup
beforeAll(async () => {
  await sequelize.authenticate();
  console.log('Test database connected successfully');
});


// Clean up after all tests
afterAll(async () => {
  await sequelize.close();
  console.log('Test database connection closed');
});

// Global test timeout
jest.setTimeout(30000);