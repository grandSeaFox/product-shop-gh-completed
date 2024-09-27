'use client';

import ProductCarousel from "@/components/ProductCarousel";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";
import { useProducts } from "@/lib/providers/ProductsProvider";
import Image from "next/image";
import Link from "next/link";
import { toast } from '@/lib/hooks/use-toast';

const Home = () => {
    const { products, isLoading, error } = useProducts();
    const homeProduct = products[0];

    if (isLoading) {
        return (
            <HomePageSkeleton />
        );
    }

    if(error) {
      toast({variant: 'destructive', title: error})

      return <div>There seems to have been an error</div>
    }

    return (
        /* Ideally, these would all be products with no bg */
        <div className="py-8" data-testid="home-page">
            <section className="my-12 flex items-center justify-center flex-col">
                <div className="p-3 rounded group">
                    <Link key={homeProduct.id} href={`/products/${homeProduct.id}`} className="text-primary block">
                        <div className="relative overflow-hidden rounded-3xl shadow group-hover:shadow-lg">
                            <Image
                                src={homeProduct.image}
                                alt={homeProduct.name}
                                width={600}
                                height={400}
                                className="transition-transform duration-1000 ease-in-out group-hover:scale-105"
                            />
                        </div>
                    </Link>
                </div>
            </section>
            <section className="bg-accent w-full py-10 px-5">
                <div className="w-full text-center">
                    <h2 className="text-2xl font-normal mb-6">Products</h2>
                </div>
                <ProductCarousel products={products.slice(1, 10)} />
            </section>
            <section className='w-full h-56 flex justify-center items-center'>
                Other sections
            </section>
        </div>
    );
};

export default Home;