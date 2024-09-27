'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/product';
import { completeOrder, createOrder, getOrderById, updateOrder } from '@/lib/actions/api';

type CartItem = Product & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    completePurchase: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItemsInCart: number;
    isCartOpen: boolean;
    error: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalItemsInCart, setTotalItemsInCart] = useState<number>(0);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTotalItemsInCart(cart.length);
    }, [cart.length]);

    // This will check if there is already a basket/order created and if there is we will automatically set the products in the basket
    useEffect(() => {
        const loadOrder = async () => {
            const storedOrderId = localStorage.getItem('orderId');
            if (storedOrderId) {
                try {
                    const order = await getOrderById(parseInt(storedOrderId));
                    if (order) {
                        setOrderId(order.id);
                        setCart(order.products.map((p) => ({ ...p.product, quantity: p.quantity })));
                    } else {
                        setError('Order not found');
                        localStorage.removeItem('orderId');
                    }
                } catch (err) {
                    setError('Failed to load existing order');
                }
            }
        };

        loadOrder();
    }, []);


    const openCart = async () => {
        if (!orderId) {
            try {
                const orderData = await createOrder(cart.map(item => ({ id: item.id, quantity: item.quantity })));
                if (orderData) {
                    setOrderId(orderData.id);
                    localStorage.setItem('orderId', String(orderData.id));
                } else {
                    setError('Error creating new order');
                }
            } catch (err) {
                setError('Error creating new order');
            }
        } else {
            const storedOrderId = localStorage.getItem('orderId');
            if (storedOrderId) {
                try {
                    const order = await getOrderById(parseInt(storedOrderId));
                    if (order) {
                        setOrderId(order.id);
                        setCart(order.products.map((p) => ({ ...p.product, quantity: p.quantity })));
                    } else {
                        setError('Order not found');
                        localStorage.removeItem('orderId');
                    }
                } catch (err) {
                    setError('Error loading existing order');
                }
            }
        }
        setIsCartOpen(true);
    };

    const closeCart = () => {
        clearCart();
        setIsCartOpen(false);
        localStorage.removeItem('orderId');
    };

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existingItem) {
            updatedCart = cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
    };

    const removeFromCart = async (productId: number) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);

        if (isCartOpen && orderId) {
            try {
                await updateOrder(orderId, productId, 0);
            } catch (err) {
                setError('Error removing item from order');
            }
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(0, item.quantity + quantity);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCart(updatedCart);

        const updatedItem = updatedCart.find(item => item.id === productId);

        if (updatedItem) {
            if (updatedItem.quantity === 0) {
                await removeFromCart(productId);
            } else if (orderId && isCartOpen) {
                try {
                    await updateOrder(orderId, productId, updatedItem.quantity);
                } catch (err: any) {
                    setError(err.message);
                }
            }
        }
    };


    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('orderId');
        setOrderId(null);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const completePurchase = async () => {
        if (!orderId) return;

        try {
            await completeOrder(orderId);
            clearCart();
            setOrderId(null);
        } catch (err) {
            setError('Error completing purchase');
        }
    };

    return (
      <CartContext.Provider value={{
          cart,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          getCartTotal,
          completePurchase,
          openCart,
          closeCart,
          totalItemsInCart,
          isCartOpen,
          error,
      }}>
          {children}
      </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
