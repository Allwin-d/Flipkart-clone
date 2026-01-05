import ProductCart from "../components/ProductCart";
import type { RootState } from "../Store/store"; // adjust path
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cartItems.map((item)=>(
        <ProductCart
          id = {item.id}
          title = {item.title}
          brand = {item.brand}
          img = {item.images[0]}
          price ={item.price}
          discount ={item.discountPercentage}
          description = {item.description}
        />
      ))}
    </div>
  );
};

export default Cart;
