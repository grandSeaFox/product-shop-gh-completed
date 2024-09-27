'use client';

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useIsMobile from '@/lib/hooks/useIsMobile';
import { useCart } from '@/lib/providers/CartProvider';
import CompleteOrderButton from '@/components/ButtonCompleteOrder';
import { toast } from '@/lib/hooks/use-toast';

const Cart = ({onCompletePurchase} : {onCompletePurchase?: () => void}) => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, error} = useCart();
    const isMobile = useIsMobile();
    const orderId = localStorage.getItem('orderId') || 0;


    if(error) toast({variant: 'destructive', title: error})

    return (
        <div className="p-4 h-full">
            <h2 className="text-2xl font-bold mb-4">Your Cart - order {orderId}</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="h-full flex flex-col">
                    <ul className="space-y-4 overflow-y-auto">
                        {cart.map((item) => item.quantity > 0 && (
                            <li key={item.id} className="flex justify-between items-center group">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.name}</span>
                                        <div className="flex items-center mt-1">
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="mx-2 px-2">{item.quantity}</span>
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <span className="mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFromCart(item.id)}
                                        className={isMobile ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center border-t pt-4 mt-10">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${getCartTotal()}</span>
                    </div>
                    <CompleteOrderButton onCompletePurchase={onCompletePurchase}/>
                </div>
            )}
        </div>
    );
};

export default Cart;