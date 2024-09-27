import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function ProductPageSkeleton() {
    return (
        <div className="container mx-auto p-4" data-testid="product-page-skeleton">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i} className="rounded-none shadow-none border-none bg-secondary">
                        <CardHeader>
                            <Skeleton className="w-full h-64" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
