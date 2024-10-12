import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Search for products based on filters
export const searchProducts = async (req, res) => {
    const { subCategoryId, categoryName, districtName, minPrice, maxPrice } = req.body;

    const parsedMinPrice = isNaN(minPrice) ? 0 : minPrice;
    const parsedMaxPrice = maxPrice === Infinity ? 100000 : maxPrice;
    
    let products = [];

    try {
      //If all are selected as all display all products
      if(districtName=="All" && categoryName!=="All" && subCategoryId!=="all"){
        products = await prisma.product.findMany({
            where:{
                mainCategory: categoryName,
                categoryId: subCategoryId,
                price: {
                    gte: parsedMinPrice, // Greater than or equal to minPrice
                    lte: parsedMaxPrice, // Less than or equal to maxPrice
                },
            },
            include: {
              category: true,
              reviews:true
            },
          });
      }

      else if(districtName=="All" && categoryName!=="All" && subCategoryId=="all" ){
        products = await prisma.product.findMany({
            where:{
                mainCategory: categoryName,
                price: {
                    gte: parsedMinPrice, // Greater than or equal to minPrice
                    lte: parsedMaxPrice, // Less than or equal to maxPrice
                },
            },
            include: {
                category: true,
                reviews: true
            },
        });
      }

      else if(districtName=="All" && categoryName=="All" && subCategoryId!=="all"){
        products = await prisma.product.findMany({
            where:{
                categoryId: subCategoryId,
                price: {
                    gte: parsedMinPrice, // Greater than or equal to minPrice
                    lte: parsedMaxPrice, // Less than or equal to maxPrice
                },
            },
            include: {
                category: true,
                reviews: true
            },
        });
      } 

      else if((districtName=="All") && categoryName=="All" && subCategoryId=="all"){
        products = await prisma.product.findMany({
            where:{
                price: {
                    gte: parsedMinPrice, // Greater than or equal to minPrice
                    lte: parsedMaxPrice, // Less than or equal to maxPrice
                },
            },
            include:{
                category: true,
                reviews: true
            },
        });
      }

      //Code for district names.
      else if(districtName!=="All"){
        const stores = await prisma.store.findMany({
            where: {
              district: districtName,
            },
          });

          console.log("Now fetching product in"+districtName+" district.")
        
        const storeIds = stores.map((store)=>store.id)
         
        if(categoryName!=="All" && subCategoryId!=="all"){
            products = await prisma.product.findMany({
                where:{
                    storeId: {
                        in: storeIds,
                    },
                    categoryId: subCategoryId,
                    mainCategory: categoryName,
                    price: {
                        gte: parsedMinPrice, // Greater than or equal to minPrice
                        lte: parsedMaxPrice, // Less than or equal to maxPrice
                    },
                },
                include: {
                    category: true,
                    reviews: true,
                }
            })
        }

        else if(categoryName!=="All" && subCategoryId=="all"){
            products = await prisma.product.findMany({
                where:{
                    storeId: {
                        in: storeIds,
                    },
                    mainCategory: categoryName,
                    price: {
                        gte: parsedMinPrice, // Greater than or equal to minPrice
                        lte: parsedMaxPrice, // Less than or equal to maxPrice
                    },
                },
                include: {
                    category: true,
                    reviews: true,
                }
            })
        }

        else if(categoryName=="All" && subCategoryId!=="all"){
            products = await prisma.product.findMany({
                where:{
                    storeId: {
                        in: storeIds,
                    },
                    categoryId: subCategoryId,
                    price: {
                        gte: parsedMinPrice, // Greater than or equal to minPrice
                        lte: parsedMaxPrice, // Less than or equal to maxPrice
                    },
                },
                include: {
                    category: true,
                    reviews: true,
                }
            })
        }

        else if(categoryName=="All" && subCategoryId=="all"){
            products = await prisma.product.findMany({
                where:{
                    storeId: {
                        in: storeIds,
                    },
                    price: {
                        gte: parsedMinPrice, // Greater than or equal to minPrice
                        lte: parsedMaxPrice, // Less than or equal to maxPrice
                    },
                },
                include: {
                    category: true,
                    reviews: true,
                }
            })
        }
        
      }
        





      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error in searching products' });
    }
  };