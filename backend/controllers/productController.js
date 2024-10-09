import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        discount: {
          gt: 0,
        },
      },
      include:{
        category:true,
        reviews:true
      },
      orderBy: {
        discount: 'desc', 
      },
      take: 10, 
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



// Search for products based on filters
export const searchProducts = async (req, res) => {
  const { categoryId, districtId, minPrice, maxPrice } = req.body;

  try {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          categoryId ? { categoryId } : {},
          districtId ? { districtId } : {},
          {
            price: {
              gte: minPrice || 0,
              lte: maxPrice || Infinity,
            },
          },
        ],
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Search for products based on filters
export const getProduct = async (req, res) => {
  const { productId } = req.query;
  console.log("Product is "+productId);
    try {
      const product = await prisma.product.findUnique({
        where: {
          id:productId
        },
        include:{
          category:true,
          reviews:true
        }
      });
    console.log("Inside get product",product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getSameCatProduct = async (req, res) => {  //Created with intention of fethcing catergory, but sometimes might not need it.
  const { productId } = req.query;
  console.log("Product is "+productId);
    try {
      const product = await prisma.product.findUnique({
        where: {
          id:productId
        },
        include:{
          category:true,
          reviews:true
        }
      });
    console.log("Inside get product",product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};