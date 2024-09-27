// components/ProductCarousel.tsx
'use client'

import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

interface ProductCarouselProps {
    products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true }),
    )

    return (

        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="-ml-4 md:-ml-6">
                {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                        <Link href={`/products/${product.id}`} className="text-primary block group w-full">
                            <div className="relative overflow-hidden rounded-lg shadow transition-all duration-800 ease-in-out group-hover:shadow-lg w-full aspect-square">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-800 ease-in-out group-hover:scale-105"
                                />
                            </div>
                            <div className="border-t-2 border-tertiary mt-4 w-full" />
                            <div className="flex justify-between items-center mt-2 w-full">
                                <h3 className="font-semibold text-sm">{product.name}</h3>
                                <p className="text-gray-800 text-sm">${product.price}</p>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

    )
}



export default ProductCarousel;