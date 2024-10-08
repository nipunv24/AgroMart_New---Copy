import express from 'express';
import { getProducts, getCategories, searchProducts, getProduct  } from '../controllers/productController.js'; // Ensure to include .js if required

const router = express.Router();

// Get products route
router.get('/', getProducts);

// Get categories route
router.get('/categories', getCategories);

// Search products route
router.post('/search', searchProducts);

router.get('/getProduct', getProduct);

export default router;
