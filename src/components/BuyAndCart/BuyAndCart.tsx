import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  BUY_NOW,
  PRODUCT_ADDED,
} from "../../Constants/ConstantVariables/constantsVariables";
import type { prodProps } from "./buyAndCart.types";
import { addToCart, clearAll } from "../../Slices/CartSlice";
import type { AppDispatch } from "../../Store/store";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { useState } from "react";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";

const BuyAndCart = ({ prod, available }: prodProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleDispatch = () => {
    dispatch(addToCart(prod));
    toast.success(`${PRODUCT_ADDED}`);
  };

  const handleBuy = () => {
    setIsOrderPlaced(!isOrderPlaced);
    dispatch(clearAll());
  };

  return (
    <div className="flex items-center justify-around mt-8">
      <Button
        className={`${available === "Out of Stock" ? `bg-orange-500 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-700 hover:scale-105 transition duration-200 hover:cursor-not-allowed` : `bg-orange-500 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-700 hover:scale-105 transition duration-200`} `}
        onClick={() => handleDispatch()}
        children={ADD_TO_CART}
        disabled={available === "Out of Stock"}
      />
      <Button
        className={`${available === "Out of Stock" ? `bg-orange-700 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-900 hover:scale-105 transition duration-200 hover:cursor-not-allowed` : `bg-orange-700 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-900 hover:scale-105 transition duration-200`} `}
        onClick={handleBuy}
        children={BUY_NOW}
        disabled={available === "Out of Stock"}
      />
      {isOrderPlaced ? (
        <OrderSuccessModal
          isOpen={isOrderPlaced}
          onClose={() => setIsOrderPlaced(false)}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BuyAndCart;
