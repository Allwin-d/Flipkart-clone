import { USD_TO_INR_RATE } from "../Constants/Constants";

// Convert ONLY for UI
export const CurrencyConverter = (price: number): number => {
  return Math.floor(price * USD_TO_INR_RATE);
};

// Correct way to get original price from discounted price
export const getOriginalPrice = (
  price: number,
  discountPercentage: number,
): number => {
  return Math.floor(price / (1 - discountPercentage / 100));
};

export const Capitalize = (value: string) => {
  return `${value.trim().charAt(0).toUpperCase() + value.slice(1)}`;
};

export const UpperCase = (value: string) => {
  return value.trim().toUpperCase();
};
