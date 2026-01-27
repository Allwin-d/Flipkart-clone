
export const currConveter = (price: number): string => {
  return `₹ ${(price * 91).toFixed(3)}`;
};


export const discountConverted = (total: number, dis: number): number => {
  return total * (dis / 100);
};
