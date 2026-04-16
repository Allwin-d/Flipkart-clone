export const CurrencyConverter = (price: number): number => {
  return Math.floor(price * 83);
};

export const OriginalPrice = (
  orgPrice: number,
  discountPercentage: number,
): number => {
  return Math.floor(orgPrice * (discountPercentage / 100) + orgPrice);
};

export const Capitalize = (value: string) => {
  return `${value.charAt(0).toUpperCase() + value.slice(1)}`;
};
