import { useDispatch } from "react-redux";
import { ADD_TO_CART, BUY_NOW, PRODUCT_ADDED } from "../Constants/Constants";
import type { CartItem } from "../Types/ApiResponse";
import { addToCart } from "../Slices/CartSlice";
import type { AppDispatch } from "../Store/store";
import toast from "react-hot-toast";

type prodProps = {
  prod: CartItem;
};

const BuyAndCart = ({ prod }: prodProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDispatch = () => {
    dispatch(addToCart(prod));
    toast.success(`${PRODUCT_ADDED}`);
  };
  return (
    <div className="flex items-center justify-around mt-8">
      <button
        className="bg-orange-500 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-700 hover:scale-105 transition duration-200 "
        onClick={() => handleDispatch()}
      >
        {ADD_TO_CART}
      </button>
      <button className="bg-orange-700 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-900 hover:scale-105 transition duration-200">
        {BUY_NOW}
      </button>
    </div>
  );
};

export default BuyAndCart;
