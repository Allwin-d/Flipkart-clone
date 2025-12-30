import type { RootState } from "../Store/store"; // adjust path
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cartItems.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default Cart;
