const { Given } = require('@cucumber/cucumber');
const axios = require('axios');

// HTTP Return Codes
const HTTP_200_OK = 200;
const HTTP_201_CREATED = 201;
const HTTP_204_NO_CONTENT = 204;

Given('the following products', async function (dataTable) {
  // Delete all products first
  const restEndpoint = `${this.parameters.baseUrl}/api/products`;
  
  try {
    const response = await axios.get(restEndpoint);
    if (response.status === HTTP_200_OK) {
      // Delete each product
      for (const product of response.data) {
        const deleteResponse = await axios.delete(`${restEndpoint}/${product.id}`);
        if (deleteResponse.status !== HTTP_204_NO_CONTENT) {
          throw new Error(`Failed to delete product ${product.id}`);
        }
      }
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      throw error;
    }
  }
  
  // Load the database with new products
  for (const row of dataTable.hashes()) {
    //
    // ADD YOUR CODE HERE TO CREATE PRODUCTS VIA THE REST API
    //
    // Create payload with product data from the table row
    // Send POST request to create each product
    // Assert that the response status is HTTP_201_CREATED
  }
});