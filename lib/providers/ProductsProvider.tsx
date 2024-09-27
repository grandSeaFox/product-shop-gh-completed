'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../actions/api';

type ProductsContextType = {
    products: Product[];
    groupedProducts: { [key: string]: Product[] };
    isLoading: boolean;
    error: string | null;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: Product[] }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();

                if (fetchedProducts) {
                    setProducts(fetchedProducts);

                    // i. List products grouped and sorted by category. (requirement for product page)
                    const grouped = fetchedProducts.reduce((acc, product) => {
                        const category = product.category.name;
                        if (!acc[category]) {
                            acc[category] = [];
                        }
                        acc[category].push(product);
                        return acc;
                    }, {} as { [key: string]: Product[] });

                    // Sorting products by category order
                    Object.keys(grouped).forEach(category => {
                        grouped[category].sort((a, b) => a.category.order - b.category.order);
                    });

                    setGroupedProducts(grouped);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('An error occurred while fetching products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);


    return (
        <ProductsContext.Provider value={{
            products,
            groupedProducts,
            isLoading,
            error
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};