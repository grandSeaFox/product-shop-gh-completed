import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartButton from '@/components/CartButton';

const Header = () => {
    return (
        <header className="bg-background h-28 py-8 top-0 fixed w-full z-10">
            <div className="container px-1 flex relative h-full">
                <div className="absolute left-1/2 -translate-x-1/2">
                    <nav className="gap-1 flex flex-col text-center ">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            GH Shop
                        </Link>
                        <div className="flex gap-3">
                            <Link href="/products" className="text-foreground hover:text-primary">
                                PRODUCTS
                            </Link>
                            <Link href="/about" className="text-foreground hover:text-primary">
                                ABOUT
                            </Link>
                        </div>

                    </nav>
                </div>

                <div className="flex items-center space-x-4 ml-auto">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex p-2">
                        <User className="h-6 w-6" />
                    </Button>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;