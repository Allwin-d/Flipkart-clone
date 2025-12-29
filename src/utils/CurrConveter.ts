export const CurrConverter = (price: number | undefined) => {
  return Math.floor(price ? price * 83 : 0);
};
