import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductsPage from '@/app/products/page';
import {ProductsProvider, useProducts} from '@/lib/providers/ProductsProvider';
import {CartProvider} from "@/lib/providers/CartProvider";
import {Toaster} from "@/components/ui/toaster";
import userEvent from '@testing-library/user-event';

const mockGroupedProducts = {
  Category1: [
    { id: '1', name: 'Product 1', price: 10, image: '/product1.jpg' },
    { id: '2', name: 'Product 2', price: 20, image: '/product2.jpg' },
  ],
  Category2: [
    { id: '3', name: 'Product 3', price: 30, image: '/product3.jpg' },
  ],
};

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };
});

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, blurDataURL, placeholder, ...props }: any) => {
    // Filter out Next.js specific props
    const filteredProps = { ...props };
    return <img src={src} alt={alt} width={width} height={height} {...filteredProps} />;
  },
}));

// Mock the useProducts hook
jest.mock('@/lib/providers/ProductsProvider', () => ({
  ...jest.requireActual('@/lib/providers/ProductsProvider'),
  useProducts: jest.fn(),
}));

function createMockPointerEvent(
    type: string,
    props: PointerEventInit = {}
): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('ProductsPage', () => {
  const renderProductsPage = async () => {
    await act(async () => {
      render(
          <CartProvider>
            <ProductsProvider>
              <ProductsPage />
            </ProductsProvider>
            <Toaster />
          </CartProvider>
      );
    });
  };


  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      groupedProducts: mockGroupedProducts,
      isLoading: false,
      error: null,
    });
  });

  it('renders the page title', async () => {
    await renderProductsPage();
    expect(screen.getByText('Products by Category')).toBeInTheDocument();
  });

  it('renders category headers', async () => {
    await renderProductsPage();
    expect(screen.getByText('Category1')).toBeInTheDocument();
    expect(screen.getByText('Category2')).toBeInTheDocument();
  });

  it('renders product cards', async () => {
    await renderProductsPage();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('renders product prices', async () => {
    await renderProductsPage();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
    expect(screen.getByText('Price: $30')).toBeInTheDocument();
  });

  it('renders category select dropdown', async () => {
    await renderProductsPage();
    expect(screen.getByText('Select a category')).toBeInTheDocument();
  });

  it('filters products when a category is selected', async () => {
    const user = userEvent.setup();
    await renderProductsPage()


    // Create a custom container for portals in the test
    const portalContainer = document.createElement("div");
    document.body.appendChild(portalContainer);
    render(<div/>, { container: portalContainer });

    await waitFor(() => {
      expect(screen.getByText('Products by Category')).toBeInTheDocument();
    });


    await waitFor(() => {
      expect(screen.getByText('Category1')).toBeInTheDocument();
      expect(screen.getByTestId('category-select')).toBeInTheDocument();
    });

    const selectButton = screen.getByTestId('category-select');
    await user.click(selectButton);

    await waitFor(() => {
      expect(screen.getByTestId('select-item-Category1')).toBeInTheDocument();
    });

    const option1 = screen.getByTestId('select-item-Category1');
    await user.click(option1)

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
    });
  });

  it('displays loading skeleton when isLoading is true', async () => {
    (useProducts as jest.Mock).mockReturnValue({
      groupedProducts: {},
      isLoading: true,
      error: null,
    });
    await renderProductsPage();
    expect(screen.getByTestId('product-page-skeleton')).toBeInTheDocument();
  });

  it('displays error message when there is an error', async () => {
    (useProducts as jest.Mock).mockReturnValue({
      groupedProducts: {},
      isLoading: false,
      error: 'Error fetching products',
    });
    await renderProductsPage();
    expect(screen.getByText('Error fetching products')).toBeInTheDocument();
  });
});