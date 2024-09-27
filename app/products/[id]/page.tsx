'use client';

import { useProducts } from '@/lib/providers/ProductsProvider';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import ProductDetailsSkeleton from '@/components/skeletons/ProductDetailsSkeleton';
import { AddToCartButton } from '@/components/ButtonAddToCart';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { products, isLoading: contextLoading, error } = useProducts();
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0 && params.id) {
      const selectedProduct = products.find((prod) => prod.id === +params.id);
      setProduct(selectedProduct);
      setIsLoading(false);
    } else if (!contextLoading) {
      setIsLoading(false);
    }
  }, [params.id, products, contextLoading]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error) return <div>Error: {error}</div>;

  if (!product) return <div>No product found</div>;

  return (
    <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl priceColor font-semibold mb-6">${product.price}</p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <p className="text-sm text-gray-500">{product.category.name}</p>
          </div>
        </div>
        <AddToCartButton product={product}/>
      </div>
    </div>
  );
}