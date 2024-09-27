import { Skeleton } from "@/components/ui/skeleton";

const HomePageSkeleton = () => {
    return (
        <div className="py-8" data-testid="home-page-skeleton">
            <section className="my-12 flex items-center justify-center flex-col">
                <div className="p-3 rounded">
                    <Skeleton className="w-[600px] h-[600px] rounded-3xl" />
                </div>
            </section>
            <section className="bg-accent w-full py-10 px-5">
                <div className="w-full text-center">
                    <Skeleton className="h-8 w-48 mx-auto mb-6" />
                </div>
                <div className="flex overflow-hidden space-x-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex-shrink-0">
                            <Skeleton className="w-96 h-96 rounded-lg" />
                        </div>
                    ))}
                </div>
            </section>
            <section className='w-full h-56 flex justify-center items-center'>
                <Skeleton className="w-3/4 h-32" />
            </section>
        </div>
    );
};

export default HomePageSkeleton;