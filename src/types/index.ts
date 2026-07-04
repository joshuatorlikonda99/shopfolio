export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type StockLevel = "in-stock" | "low-stock" | "sold-out";

export interface SizeOption {
  label: string; 
  stock: number;
  stockLevel: StockLevel;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ProductVariants {
  colors: ColorOption[];
  sizes: SizeOption[];
  originalPrice: number | null; 
  brand: string;
  images: string[]; 
}

export interface Product extends FakeStoreProduct {
  variants: ProductVariants;
}

export interface SelectedVariant {
  color: string;
  size: string;
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  unitPrice: number;
  color: string;
  size: string;
  quantity: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; productId: number; color: string; size: string }
  | { type: "SET_QUANTITY"; productId: number; color: string; size: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };
