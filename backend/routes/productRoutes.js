import express from 'express';
import { getProducts, getSubCategories, getCategories ,searchProducts, getProduct, getReviews, getDistricts  } from '../controllers/productController.js'; // Ensure to include .js if required

const router = express.Router();

// Get products route
router.get('/', getProducts);

// Get sub categories route
router.get('/subcategories', getSubCategories);

// Get categories route
router.get('/categories', getCategories);

// Search products route
router.post('/search', searchProducts);


//Getting a single product route is shown below.
router.get('/product', getProduct);


//Accessing reviews related to a product is shown below.
router.get('/reviews', getReviews)


//Accessing the districts 
router.get('/districts',getDistricts)





export default router;
