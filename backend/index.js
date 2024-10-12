import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'; // Ensure to include the file extension

// require('dotenv').config(); // To use .env variables

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
