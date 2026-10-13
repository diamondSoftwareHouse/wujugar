export type Product = {
  id: string;
  item_code: string;
  name: string;
  description: string | null;
  quantity: number;
  selling_price: string | number;
  image: string | null;
};
