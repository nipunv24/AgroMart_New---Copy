import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all categories
export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.category.findMany();
    res.json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in fetching sub categories' });
  }
};


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.product.findMany({
      select: {
        mainCategory: true,
      },
      where: {
        mainCategory: {
          not: null, //Exclude null values
        },
      },
      distinct: ['mainCategory']
    });
    const categoryNames = categories.map(product => product.mainCategory).filter(Boolean);
    
    res.json(categoryNames);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in fetching main category names' });
  }
};



export const getDistricts = async (req, res) => {
  try {
    // Fetch distinct district names from the Store model
    const districts = await prisma.store.findMany({
      select: {
        district: true,
      },
      where: {
        district: {
          not: null, // Exclude null values if necessary
        },
      },
      distinct: ['district'], // Ensures unique district names
    });

    // Extract district names from the result
    const districtNames = districts.map(store => store.district).filter(Boolean);

    res.json(districtNames);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: 'Error fetching districts' });
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
      // take: 10, 
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error in fetching a all products at once(getProducts function)' });
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
          // districtId ? { districtId } : {},
          // {
          //   price: {
          //     gte: minPrice || 0,
          //     lte: maxPrice || Infinity,
          //   },
          // },
        ],
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





// Getting data related to a single product.
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
    res.status(500).json({ error: 'Error in fetching a single product(getProduct function)' });
  }
};



//getting Reviews related to a certain product
export const getReviews = async (req, res) => {
  const { productId } = req.query;
  console.log("ProductId needed for getReviews function is "+productId);
    try {
      const reviews = await prisma.review.findMany({
        where:{
            productId
        }
      });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in fetching reviews(getReviews function)' });
  }
};
