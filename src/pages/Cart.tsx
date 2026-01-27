import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import { currConveter } from "../utils/CurrConveter";
import { removeFromCart } from "../Slices/CartSlice";
import type { Product } from "../Types/ApiResponse";

const Cart = () => {
  const data = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (val: Product) => {
    dispatch(removeFromCart(val));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      {data.length > 0 ? (
        <div className="w-11/12 max-w-7xl grid grid-cols-12 gap-6 py-10">
          {/* Left Section – Cart Items */}
          <div className="col-span-8 space-y-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-6 bg-white p-6 rounded-xl shadow-sm"
              >
                {/* Image */}
                <div className="w-32 h-32 flex items-center justify-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 flex-1">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="font-medium text-gray-900">
                    {currConveter(item.price)}
                  </p>

                  <button
                    className="mt-2 w-fit bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section – Price Details */}
          <div className="col-span-4 bg-white rounded-xl shadow-sm p-6 h-fit">
            <p className="font-semibold text-lg mb-4">Price Details</p>
            {/* content later */}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-4xl text-red-600 ">
          Your Cart is Empty
        </div>
      )}
    </div>
  );
};

export default Cart;
