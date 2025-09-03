import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import type { Product } from "../Types/types";
import { IncreaseQuantity } from "../Slices/CartSlice";
import { DecreaseQuantity } from "../Slices/CartSlice";
import { removeFromCart } from "../Slices/CartSlice";

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

  function handleRemove(val: Product) {
    dispatch(removeFromCart(val));
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col space-y-3 items-center justify-center">
        {value.map((item) => {
          return (
            <div className="flex flex-row space-x-20" key={item.id}>
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-40 h-40"
              />
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
              <div className="flex items-center justify-center">
                <button onClick={() => handleRemove(item)}>Remove </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
