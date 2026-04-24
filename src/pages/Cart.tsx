import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import {
  clearAll,
  removeFromCart,
  decreaseQuantity,
  addToCart,
} from "../Slices/CartSlice";
import RatingAndStock from "../components/Ratings";
import PriceSection from "../components/PriceSection";
import {
  Capitalize,
  CurrencyConverter,
  getOriginalPrice,
  UpperCase,
} from "../utils/utilityFunctions";
import type { CartItem } from "../Types/ApiResponse";
import {
  CART,
  DELIVERY_CHARGES,
  DISCOUNT,
  FREE,
  PLACE_ORDER,
  REMOVE,
} from "../Constants/Constants";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // ✅ Total Items Count (with quantity)
  const cartLength = cartData.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  // ✅ Total Discounted Price
  const totalPrice = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // ✅ Total Original Price
  const totalOriginalPrice = cartData.reduce((acc, item) => {
    const original = getOriginalPrice(item.price, item.discountPercentage);
    return acc + original * item.quantity;
  }, 0);

  // ✅ Total Discount
  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleRemove = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrease = (item: CartItem) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncrease = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT SECTION */}
      <div className="w-3/4 p-10">
        <div className="flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl">My {CART}</h1>
              <p>{cartLength} items in your Cart</p>
            </div>

            <button onClick={() => dispatch(clearAll())}>Clear All</button>
          </div>

          {/* ITEMS */}
          <div className="flex flex-col space-y-5 mt-5">
            {cartData.map((item) => (
              <div key={item.id} className="flex items-center justify-around">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-[200px] h-[200px] object-contain"
                />

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

                  <div className="flex flex-row justify-center items-center space-x-10 text-xl">
                    <button
                      className="bg-gray-300 px-4"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <p className="font-bold">{item.quantity}</p>
                    <button
                      className="bg-gray-300 px-4"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="bg-red-600 text-white rounded-lg p-2 hover:transition duration-150 hover:scale-110 "
                  onClick={() => handleRemove(item)}
                >
                  {REMOVE.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/4 p-5 flex justify-center">
        <div className="flex flex-col space-y-8 text-3xl ">
          <h1 className="font-bold text-gray-500">
            {UpperCase("Price Details")}
          </h1>

          <div className="flex justify-between">
            <p>Price ({cartLength} items)</p>
            <p className="font-bold">
              ₹ {CurrencyConverter(totalOriginalPrice)}
            </p>
          </div>

          <div className="flex justify-between text-green-600 border-t pt-2">
            <p className="text-green-700">{DISCOUNT}</p>
            <p className="font-bold">- ₹ {CurrencyConverter(totalDiscount)}</p>
          </div>

          <div className="flex justify-between border-t pt-2 ">
            <p>{DELIVERY_CHARGES}</p>
            <p className="font-bold text-green-600">{FREE}</p>
          </div>

          <div className="flex justify-between font-bold border-t pt-2">
            <p>Total Amount</p>
            <p>₹ {CurrencyConverter(totalPrice)}</p>
          </div>

          <div className="cursor-pointer">
            <p className="font-bold text-2xl bg-green-200 text-green-600 py-2 px-4 rounded-lg ">
              You will Save ₹ {CurrencyConverter(totalDiscount)} on this order
            </p>
          </div>
          <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:transition duration-150 hover:scale-105">
            {PLACE_ORDER.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
