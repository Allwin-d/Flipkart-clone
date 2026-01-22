export const currConveter = (price: number) => {
  return ` ₹ ${Number(price * 91).toFixed(3)}`;
};
