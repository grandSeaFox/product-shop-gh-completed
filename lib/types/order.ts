import { Product } from '@/lib/types/product';

type OrderProduct = {
  id: number;
  quantity: number;
  product: Product;
};

export type Order = {
  id: number;
  createdAt: string;
  status: string;
  products: OrderProduct[];
};