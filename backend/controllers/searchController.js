import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search for products based on filters and finally do a small logic to filter after discount decreament.
export const searchProducts = async (req, res) => {
    const { subCategoryId, categoryName, districtName, minPrice, maxPrice } = req.body;

    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = !isFinite(parseFloat(maxPrice)) || isNaN(parseFloat(maxPrice)) ? 100000 : parseFloat(maxPrice);
    
    let products = [];

    try {
        // If all districts are selected but specific category/subcategory is selected
        if (districtName === "All" && categoryName !== "All" && subCategoryId !== "all") {
            products = await prisma.product.findMany({
                where: {
                    mainCategory: categoryName,
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
        else if (districtName === "All" && categoryName !== "All" && subCategoryId === "all") {
            products = await prisma.product.findMany({
                where: {
                    mainCategory: categoryName,
                    price: {
                        gte: parsedMinPrice,
                        lte: parsedMaxPrice,
                    },
                },
                include: {
                    category: true,
                    reviews: true
                },
            });
        }
        else if (districtName === "All" && categoryName === "All" && subCategoryId !== "all") {
            products = await prisma.product.findMany({
                where: {
                    categoryId: subCategoryId,
                    price: {
                        gte: parsedMinPrice,
                        lte: parsedMaxPrice,
                    },
                },
                include: {
                    category: true,
                    reviews: true
                },
            });
        }
        else if (districtName === "All" && categoryName === "All" && subCategoryId === "all") {
            console.log('Parsed minPrice:', parsedMinPrice, 'Type:', typeof parsedMinPrice);
            console.log('Parsed maxPrice:', parsedMaxPrice, 'Type:', typeof parsedMaxPrice);
            products = await prisma.product.findMany({
                where: {
                    price: {
                        gte: parsedMinPrice,
                        lte: parsedMaxPrice,
                    },
                },
                include: {
                    category: true,
                    reviews: true
                },
            });
        }
        // Filter based on district names
        else if (districtName !== "All") {
            const stores = await prisma.store.findMany({
                where: {
                    district: districtName,
                },
            });

            console.log("Now fetching products in " + districtName + " district.");

            const storeIds = stores.map(store => store.id);

            if (categoryName !== "All" && subCategoryId !== "all") {
                products = await prisma.product.findMany({
                    where: {
                        storeId: {
                            in: storeIds,
                        },
                        categoryId: subCategoryId,
                        mainCategory: categoryName,
                        price: {
                            gte: parsedMinPrice,
                            lte: parsedMaxPrice,
                        },
                    },
                    include: {
                        category: true,
                        reviews: true,
                    }
                });
            }
            else if (categoryName !== "All" && subCategoryId === "all") {
                products = await prisma.product.findMany({
                    where: {
                        storeId: {
                            in: storeIds,
                        },
                        mainCategory: categoryName,
                        price: {
                            gte: parsedMinPrice,
                            lte: parsedMaxPrice,
                        },
                    },
                    include: {
                        category: true,
                        reviews: true,
                    }
                });
            }
            else if (categoryName === "All" && subCategoryId !== "all") {
                products = await prisma.product.findMany({
                    where: {
                        storeId: {
                            in: storeIds,
                        },
                        categoryId: subCategoryId,
                        price: {
                            gte: parsedMinPrice,
                            lte: parsedMaxPrice,
                        },
                    },
                    include: {
                        category: true,
                        reviews: true,
                    }
                });
            }
            else if (categoryName === "All" && subCategoryId === "all") {
                products = await prisma.product.findMany({
                    where: {
                        storeId: {
                            in: storeIds,
                        },
                        price: {
                            gte: parsedMinPrice,
                            lte: parsedMaxPrice,
                        },
                    },
                    include: {
                        category: true,
                        reviews: true,
                    }
                });
            }
        }

        // Calculate price after discount and filter products
        const productsWithDiscount = products.map(product => {
            const discount = product.discount || 0; // Assuming discount is a percentage
            const priceAfterDiscount = product.price * (1 - discount / 100);
            return {
                ...product,
                priceAfterDiscount
            };
        });

        // Filter products based on price after discount
        const filteredProducts = productsWithDiscount.filter(product => 
            product.priceAfterDiscount >= parsedMinPrice &&
            product.priceAfterDiscount <= parsedMaxPrice
        );

        res.json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in searching products' });
    }
};
