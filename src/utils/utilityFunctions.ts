import { USD_TO_INR_RATE } from "../Constants/Constants";

export const CurrencyConverter = (price: number): number => {
  return Math.floor(price * USD_TO_INR_RATE);
};

export const OriginalPrice = (
  orgPrice: number,
  discountPercentage: number,
): number => {
  return Math.floor(orgPrice * (discountPercentage / 100) + orgPrice);
};

export const Capitalize = (value: string) => {
  return `${value.trim().charAt(0).toUpperCase() + value.slice(1)}`;
};
