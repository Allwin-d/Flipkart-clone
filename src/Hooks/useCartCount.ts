import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const useCartCount = () => {
  return useSelector((state: RootState) => state.cart.length);
};

export default useCartCount;
