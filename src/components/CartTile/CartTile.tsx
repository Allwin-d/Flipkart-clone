import RatingAndStock from "../Ratings/Ratings";
import PriceSection from "../PriceSection/PriceSection";
import {
  REMOVE,
  SAVE,
} from "../../Constants/ConstantVariables/constantsVariables";
import {
  Capitalize,
  CurrencyConverter,
  getOriginalPrice,
} from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import type { cartTileProps } from "./cartTile.types";

const CartTile = ({
  id,
  images,
  title,
  category,
  rating,
  avgRating,
  stock,
  price,
  discountPercentage,
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: cartTileProps) => {
  const navigate = useNavigate();

  const originalPrice = getOriginalPrice(price, discountPercentage);
  const savedAmount = (originalPrice - price) * item.quantity;

  return (
    <div key={id} className="grid grid-cols-[88px_minmax(0,1fr)] items-start gap-3 border-b pb-5 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 lg:grid-cols-[200px_minmax(0,1fr)_auto]">
      <img
        src={images}
        alt={title}
        className="h-24 w-full cursor-pointer object-contain transition duration-200 hover:scale-105 sm:h-36 lg:h-48"
        onClick={() => navigate(`/productDetails/${id}`)}
      />

      <div className="flex min-w-0 flex-col space-y-2 sm:space-y-4">
        <p className="text-sm font-bold text-gray-500 sm:text-xl">
          {category.toUpperCase()}
        </p>
        <p className="font-medium text-gray-700 sm:text-lg">{Capitalize(title)}</p>

        <RatingAndStock
          rating={avgRating}
          NoOfRatings={rating}
          stocks={stock}
        />

        <PriceSection
          FixedPrice={price}
          discountPercentage={discountPercentage}
        />

        <div className="flex flex-row items-center justify-start space-x-5 text-xl sm:justify-center sm:space-x-10">
          <Button
            className="rounded-md bg-gray-200 px-2 py-1 font-bold"
            onClick={() => onDecrease(item)}
            children="-"
          />
          
          <p className="font-bold">{item.quantity}</p>
          <Button
            className={`rounded-md bg-gray-200 px-2 py-1 font-bold`}
            onClick={() => onIncrease(item)}
            children="+"
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-row flex-wrap items-center justify-between gap-2 sm:col-span-1 sm:w-36 sm:flex-col sm:items-start sm:space-y-3 lg:w-44">
        <h1 className="text-base font-medium text-gray-500 sm:text-xl">Item Total</h1>
        <p className="text-xl font-bold sm:text-2xl">
          ₹{item.quantity * CurrencyConverter(price)}
        </p>
        <p className="text-sm font-bold text-green-700 sm:text-base">
          {Capitalize(SAVE)} ₹{CurrencyConverter(savedAmount)}
        </p>
        <Button
          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition duration-150 hover:scale-105 sm:px-4 sm:text-base"
          onClick={() => onRemove(item)}
          children={REMOVE.toUpperCase()}
        />
      </div>
    </div>
  );
};

export default CartTile;
