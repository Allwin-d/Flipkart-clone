import type { RootState } from "../Store/store";
import { useSelector } from "react-redux";

const Cart = () => {
  const value = useSelector((state: RootState) => state.cart);
  console.log(value);

  return <div>
    
  </div>;
};

export default Cart;
