import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
    return (
        <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Product Image Skeleton */}
            <div className="flex justify-center">
                <Skeleton className="w-full h-[500px] rounded-lg" />
            </div>

            {/* Right side - Product Details Skeleton */}
            <div className="flex flex-col justify-between">
                <div>
                    {/* Product Name */}
                    <Skeleton className="h-10 w-3/4 mb-4" />

                    {/* Price */}
                    <Skeleton className="h-8 w-1/4 mb-6" />

                    {/* Description */}
                    <div className="mb-8">
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-4" />

                        {/* Category */}
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-1" />
                        <Skeleton className="h-4 w-1/2 mb-1" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-10 w-1/3" />
                </div>
            </div>
        </div>
    );
}