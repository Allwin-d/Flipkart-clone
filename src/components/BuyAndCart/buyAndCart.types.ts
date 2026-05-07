import type { CartItem } from "../../Types/ApiResponse";

export type prodProps = {
  prod: CartItem;
  available: "In Stock" | "Low Stock" | "Out of Stock";
};
