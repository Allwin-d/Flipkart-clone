import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import Navbar from "../components/Navbar";
import type { Product } from "../Types/types";
import { IncreaseQuantity } from "../Slices/CartSlice";
import { DecreaseQuantity } from "../Slices/CartSlice";

const Cart = () => {
  const value = useSelector((state: RootState) => {
    return state.cart;
  });

  const dispatch = useDispatch();

  console.log("Values from Cart : ", value);

  function handleDecrement(val: Product) {
    dispatch(DecreaseQuantity(val));
  }

  function handleIncrement(val: Product) {
    dispatch(IncreaseQuantity(val));
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col space-y-3">
        {value.map((item) => {
          return (
            <div className="flex flex-row" key={item.id}>
              <img src={item.images[0]} alt={item.title} className="w-60 h-60" />
              <div className="flex flex-col space-y-4">
                <p>{item.title}</p>
                <p>{item.category}</p>
                <div className="flex space-x-3">
                  <p>Price : {item.price}</p>
                  <p>Discount : {item.discountPercentage} %</p>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <p>{item.Quantity}</p>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
