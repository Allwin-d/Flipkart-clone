import { useSelector } from "react-redux";
import type { RootState } from "../Store/store";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  console.log("Cart Data from the Cart Page: ", cartData);

  return <div className="min-h-screen w-full">{cartData.length} Length</div>;
};

export default Cart;
