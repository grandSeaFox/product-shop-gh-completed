type ProductCategory = {
  name: string;
  order: number;
};


export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: ProductCategory
};
