import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        name: true,
        description: true,
        imageUrls: true
      }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
