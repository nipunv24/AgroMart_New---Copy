import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Search for products based on filters
export const searchProducts = async (req, res) => {
    const { subCategoryId, categoryName, districtName, minPrice, maxPrice } = req.body;
    
    let products = [];

    try {
      //If all are selected as all display all products
      if(districtName=="All" && categoryName!=="All" && subCategoryId!=="all"){
        products = await prisma.product.findMany({
            where:{
                mainCategory: categoryName,
                categoryId: subCategoryId,
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
            },
            include: {
                category: true,
                reviews: true
            },
        });
      } 

      else if(districtName=="All" && categoryName=="All" && subCategoryId=="all"){
        products = await prisma.product.findMany({
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