import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import { clearAll, removeFromCart } from "../Slices/CartSlice";
import RatingAndStock from "../components/Ratings";
import PriceSection from "../components/PriceSection";
import { Capitalize } from "../utils/utilityFunctions";
import type { CartItem } from "../Types/ApiResponse";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const cartLength = cartData.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  console.log("Cart Length : ", cartLength);

  const handleRemove = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="min-h-screen w-full flex ">
      {/* Left hand section */}
      <div className="w-3/4 bg-blue-200 p-10">
        <div className="flex flex-col">
          {/* Total Length Section */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl">My Cart</h1>
              <p>{cartLength} items in your Cart</p>
            </div>
            <div>
              <button onClick={() => dispatch(clearAll())}>Clear All</button>
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            {cartData.map((item) => (
              <div className="flex flex-row items-center justify-around">
                <div>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-[200px] h-[200px] object-contain"
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <p>{item.category.toUpperCase()}</p>
                  <p>{Capitalize(item.title)}</p>
                  <RatingAndStock
                    rating={item.rating}
                    NoOfRatings={item.rating}
                    stocks={item.stock}
                  />
                  <PriceSection
                    FixedPrice={item.price}
                    discountPercentage={item.discountPercentage}
                  />
                </div>
                <div>
                  <button
                    className="bg-red-600 text-white rounded-lg p-2"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Product Detials Section */}
          <div></div>
        </div>
      </div>

      {/* Right hand section */}
      <div className="w-1/4 bg-red-200 p-5">
          
      </div>
    </div>
  );
};

export default Cart;
