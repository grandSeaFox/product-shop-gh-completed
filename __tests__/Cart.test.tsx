import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/Cart';
import {useCart} from '@/lib/providers/CartProvider';
import { toast } from '@/lib/hooks/use-toast';

// Mock the useCart hook
jest.mock('@/lib/providers/CartProvider', () => ({
  ...jest.requireActual('@/lib/providers/CartProvider'),
  useCart: jest.fn(),
}));

// Mock the toast function
jest.mock('@/lib/hooks/use-toast', () => ({
  toast: jest.fn(),
}));

jest.mock('@/components/ButtonCompleteOrder', () => ({
  __esModule: true,
  default: jest.fn(({ onCompletePurchase }) => (
      <button data-testid="complete-order" onClick={onCompletePurchase}>
        Complete Order
      </button>
  )),
}));

describe('Cart', () => {
  const mockCart = [
    { id: '1', name: 'Product 1', price: 10, quantity: 3 },
    { id: '2', name: 'Product 2', price: 20, quantity: 1 },
  ];

  const renderCart = () => {
      render(
          <Cart/>
      );
  }

  const mockUseCart = {
    cart: mockCart,
    openCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    getCartTotal: jest.fn(() => 40),
    error: null,
  };

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue(mockUseCart);
  });

  it('renders the cart title with order ID', () => {
    renderCart();

    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
  });

  it('displays cart items with name, quantity, and price', () => {
    renderCart();

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$30.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('displays the total price', () => {
    renderCart();

    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();
  });

  it('calls the onCompletePurchase when Complete Order button is clicked', async () => {
    const mockOnCompletePurchase = jest.fn();
    render(<Cart onCompletePurchase={mockOnCompletePurchase} />);

    const completeOrderButton = screen.getByTestId('complete-order');
    fireEvent.click(completeOrderButton);

    await waitFor(() => {
      expect(mockOnCompletePurchase).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error message if there is an error', () => {
    (useCart as jest.Mock).mockReturnValueOnce({
      ...mockUseCart,
      error: 'Something went wrong',
    });

    renderCart();

    expect(toast).toHaveBeenCalledWith({
      variant: 'destructive',
      title: 'Something went wrong',
    });
  });
});
