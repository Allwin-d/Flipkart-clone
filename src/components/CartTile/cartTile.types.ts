import type { CartItem } from "../../Types/ApiResponse";

export type cartTileProps = {
  id: number;
  images: string;
  title: string;
  category: string;
  rating: number;
  avgRating: number;
  stock: number;
  price: number;
  discountPercentage: number;
  quantity: number;
  item: CartItem;
  onRemove: (item: CartItem) => void;
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
};
