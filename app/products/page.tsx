'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from '@/lib/providers/ProductsProvider';
import {FormEvent, useState} from 'react';
import ProductPageSkeleton from '@/components/skeletons/ProductPageSkeleton';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddToCartButton } from '@/components/ButtonAddToCart';
import { useToast } from '@/lib/hooks/use-toast';

export default function ProductsPage() {
    const { groupedProducts, isLoading, error } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const toast = useToast()

    if (isLoading) {
        return (
            <ProductPageSkeleton />
        );
    }

    if(error) {
        toast.toast({variant: 'destructive', title: 'An error has occured'})

        return <div>{error}</div>
    }


    // instead of loading everything I would add pagination in all of these

    const categories = Object.keys(groupedProducts);

    const filteredCategories = selectedCategory
        ? [selectedCategory]
        : categories;

    const stopLinkFromDefaultBehaviour = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products by Category</h1>

            <div className="mb-6">
                <Select onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)} >
                    <SelectTrigger className="w-[180px]" data-testid="category-select">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent data-testid="select-content">
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category} data-testid={`select-item-${category}`}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filteredCategories.map((category) => (
                <div key={category} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {groupedProducts[category].map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <Card key={product.id} className="rounded-none shadow-none border-none bg-accent">
                                    <CardHeader>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            placeholder="blur"
                                            blurDataURL="blur"
                                            className="object-cover mb-4 h-64 w-full"
                                        />
                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-500">Price: ${product.price}</p>
                                        <div onClick={(e) => stopLinkFromDefaultBehaviour(e)}>
                                            <AddToCartButton product={product}/>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))
            }
        </div>
    )
}



