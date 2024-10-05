import express from 'express';
import { getProducts } from '../controllers/productController.js'; // Ensure to include .js if required
const router = express.Router();

// Get products route
router.get('/', getProducts);

export default router;
