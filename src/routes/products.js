const express = require('express');
const { Product, Category } = require('../models/product');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 200, message: 'OK' });
});

/**
 * CREATE A NEW PRODUCT
 */
router.post('/', validateProduct, async (req, res) => {
  try {
    console.log('Request to Create a Product...');
    console.log('Processing:', req.body);
    
    const product = await Product.create(req.body);
    console.log('Product with new id [%s] saved!', product.id);
    
    const location = `/api/products/${product.id}`;
    res.status(201)
       .location(location)
       .json(product.serialize());
       
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ 
      error: 'Bad Request', 
      message: error.message 
    });
  }
});

/**
 * LIST ALL PRODUCTS
 * 
 * PLACE YOUR CODE TO LIST ALL PRODUCTS HERE
 */

/**
 * READ A PRODUCT
 * 
 * PLACE YOUR CODE HERE TO READ A PRODUCT
 */

/**
 * UPDATE A PRODUCT
 * 
 * PLACE YOUR CODE TO UPDATE A PRODUCT HERE
 */

/**
 * DELETE A PRODUCT
 * 
 * PLACE YOUR CODE TO DELETE A PRODUCT HERE
 */

module.exports = router;