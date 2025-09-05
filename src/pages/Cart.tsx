import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store";
import type { CartItem } from "../Types/types";
import { IncreaseQuantity } from "../Slices/CartSlice";
import { DecreaseQuantity } from "../Slices/CartSlice";
import { removeFromCart } from "../Slices/CartSlice";

const Cart = () => {
  const value = useSelector((state: RootState) => {
    return state.cart;
  });

  const dispatch = useDispatch();

  console.log("Values from Cart : ", value);

  function handleDecrement(val: CartItem) {
    dispatch(DecreaseQuantity(val));
  }

  function handleIncrement(val: CartItem) {
    dispatch(IncreaseQuantity(val));
  }

  function handleRemove(val: CartItem) {
    dispatch(removeFromCart(val));
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col space-y-6 items-center justify-center mt-5 mb-5 ">
        {value.map((item) => {
          return (
            <div
              className="flex flex-row space-x-20 bg-gray-50 p-4 hover:cursor-pointer rounded-lg p"
              key={item.id}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-40 h-40"
              />
              <div className="flex flex-col space-y-4">
                <p className="font-semibold">{item.title}</p>
                <p className="font-light text-xl">{item.category}</p>
                <div className="flex space-x-3">
                  <p className="font-">Price : {item.price}</p>
                  <p className="font-">
                    Discount : {item.discountPercentage} %
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <p>{item.Quantity}</p>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleRemove(item)}
                  className="bg-red-600 text-white p-2 rounded-lg transition duration-200 hover:bg-red-700"
                >
                  Remove{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
