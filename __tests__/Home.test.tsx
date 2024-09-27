import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/(root)/page';
import { useProducts } from '@/lib/providers/ProductsProvider';
import { toast } from '@/lib/hooks/use-toast';

const mockProducts = [
  { id: 1, name: 'Product 1', image: '/product1.jpg' },
  { id: 2, name: 'Product 2', image: '/product2.jpg' },
];

jest.mock('@/lib/providers/ProductsProvider');
jest.mock('@/lib/hooks/use-toast');
jest.mock('@/components/ProductCarousel', () => {
  return function MockProductCarousel() {
    return <div data-testid="product-carousel">Product Carousel</div>;
  };
});
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props}/>;
  },
}));

describe('Home Component', () => {

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
  });

  it('renders the home page with products', () => {
    act(() => render(<Home />));
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByTestId('product-carousel')).toBeInTheDocument();
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();
  });

  it('displays loading skeleton when products are loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
    });
    act(() => render(<Home />));
    expect(screen.getByTestId('home-page-skeleton')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load products';
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: false,
      error: errorMessage,
    });
    act(() => render(<Home />));
    expect(screen.getByText('There seems to have been an error')).toBeInTheDocument();
    expect(toast).toHaveBeenCalledWith({ variant: 'destructive', title: errorMessage });
  });
});