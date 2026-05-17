import type { CartItem } from "../Types/ApiResponse";

export type useLocalStoragetypes = {
  value?: CartItem | CartItem[];
  method: "GET" | "SET" | "REMOVE";
};
