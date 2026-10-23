import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Store/store";
import { clearAll } from "../Slices/CartSlice";
import {
  CurrencyConverter,
  getOriginalPrice,
  UpperCase,
} from "../utils/utilityFunctions";
import type { CartItem } from "../Types/ApiResponse";
import {
  CART,
  CLEAR_ALL,
  DELIVERY_CHARGES,
  DISCOUNT,
  EMPTY_CART,
  FREE,
  PLACE_ORDER,
  PRODUCT_REMOVED,
} from "../Constants/ConstantVariables/constantsVariables";
import CartTile from "../components/CartTile/CartTile";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from "../Slices/CartSlice";
import toast from "react-hot-toast";
import Button from "../components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchComment } from "../api/comment";
import { useState } from "react";
import OrderSuccessModal from "../components/OrderSuccessModal/OrderSuccessModal";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
  };
  // Total Items Count (with quantity)
  const cartLength = cartData.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  // Total Discounted Price
  const totalDiscountedPriceUSD = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalOriginalPriceUSD = cartData.reduce((acc, item) => {
    const originalPrice = getOriginalPrice(item.price, item.discountPercentage);

    return acc + originalPrice * item.quantity;
  }, 0);

  const totalDiscountUSD = totalOriginalPriceUSD - totalDiscountedPriceUSD;

  const handleRemove = (item: CartItem) => {
    dispatch(removeFromCart(item));
    toast.error(`${PRODUCT_REMOVED}`);
  };

  const handleDecrease = (item: CartItem) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncrease = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const { data } = useQuery({
    queryKey: ["Comments"],
    queryFn: fetchComment,
  });

  const getCommentRating = (id: number) => {
    const filteredComm = data?.filter(
      (item) => Number(item.productId) === Number(id),
    );
    return filteredComm?.length;
  };

  const getAverageRating = (id: number) => {
    const filter = data?.filter(
      (item) => Number(item.productId) === Number(id),
    );
    if (!filter || filter?.length === 0) return 0;
    else {
      const TotalRatings = filter.reduce((acc, curr) => {
        return acc + Number(curr.rating);
      }, 0);
      return TotalRatings / filter.length;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* LEFT SECTION */}
      <div className="w-full p-4 sm:p-8 lg:w-3/4 lg:p-10">
        <div className="flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold sm:text-4xl">My {CART}</h1>
              <p className="text-lg font-medium text-gray-600 sm:text-2xl">
                {cartLength <= 1
                  ? `${cartLength} item in your Cart`
                  : `${cartLength} items in your Cart`}
              </p>
            </div>
            <Button
              className="shrink-0 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition duration-150 hover:scale-105 hover:bg-red-900 sm:px-4 sm:text-base"
              onClick={() => dispatch(clearAll())}
              children={CLEAR_ALL}
            />
          </div>

          {/* ITEMS */}
          <div className="flex flex-col space-y-5 mt-5">
            {cartData.length >= 1 ? (
              cartData.map((item) => (
                <CartTile
                  key={item.id}
                  id={item.id}
                  images={item.images[0]}
                  title={item.title}
                  category={item.category}
                  rating={getCommentRating(item.id) ?? 0}
                  avgRating={getAverageRating(item.id) ?? 0}
                  stock={item.stock}
                  price={item.price}
                  discountPercentage={item.discountPercentage}
                  quantity={item.quantity}
                  item={item}
                  onRemove={handleRemove}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))
            ) : (
              <div className="flex min-h-[50vh] items-center justify-center text-center text-3xl font-bold text-red-600 sm:text-5xl">
                <h1>{EMPTY_CART}</h1>
              </div>
            )}
            {}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      {cartData.length > 0 ? (
        <div className="w-full p-4 sm:p-8 lg:w-1/4 lg:p-5">
          <div className="flex flex-col space-y-5 rounded-lg border p-4 text-lg sm:space-y-8 sm:p-6 sm:text-2xl lg:text-xl xl:text-2xl">
            <h1 className="font-bold text-gray-500">
              {UpperCase("Price Details")}
            </h1>

            <div className="flex justify-between">
              <p>Price ({cartLength} items)</p>
              <p className="font-bold">
                ₹ {CurrencyConverter(totalOriginalPriceUSD)}
              </p>
            </div>

            <div className="flex justify-between text-green-600 border-t pt-2">
              <p className="text-green-700">{DISCOUNT}</p>
              <p className="font-bold">
                - ₹ {CurrencyConverter(totalDiscountUSD)}
              </p>
            </div>

            <div className="flex justify-between border-t pt-2 ">
              <p>{DELIVERY_CHARGES}</p>
              <p className="font-bold text-green-600">{FREE}</p>
            </div>

            <div className="flex justify-between font-bold border-t pt-2">
              <p>Total Amount</p>
              <p>₹ {CurrencyConverter(totalDiscountedPriceUSD)}</p>
            </div>

            <div className="cursor-pointer">
              <p className="rounded-lg bg-green-200 px-4 py-2 text-base font-bold text-green-600 sm:text-xl">
                You will Save ₹ {CurrencyConverter(totalDiscountUSD)} on this
                order
              </p>
            </div>
            <Button
              className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:transition duration-150 hover:scale-105"
              children={PLACE_ORDER.toUpperCase()}
              onClick={handlePlaceOrder}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <OrderSuccessModal
        isOpen={isOrderPlaced}
        onClose={() => setIsOrderPlaced(false)}
      />
    </div>
  );
};

export default Cart;
