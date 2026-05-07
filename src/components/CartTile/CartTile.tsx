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
    <div key={id} className="flex items-center justify-around border-b pb-5 ">
      <img
        src={images}
        alt={title}
        className="w-[200px] h-[200px] object-contain cursor-pointer transition duration-200 hover:scale-125"
        onClick={() => navigate(`/productDetails/${id}`)}
      />

      <div className="flex flex-col space-y-4">
        <p className="font-bold text-xl text-gray-500">
          {category.toUpperCase()}
        </p>
        <p className="font-medium text-gray-700">{Capitalize(title)}</p>

        <RatingAndStock
          rating={avgRating}
          NoOfRatings={rating}
          stocks={stock}
        />

        <PriceSection
          FixedPrice={price}
          discountPercentage={discountPercentage}
        />

        <div className="flex flex-row justify-center items-center space-x-10 text-xl">
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
      <div className="flex flex-col space-y-4 w-50">
        <h1 className="font-medium text-xl text-gray-500">Item Total</h1>
        <p className="font-bold text-2xl ">
          ₹{item.quantity * CurrencyConverter(price)}
        </p>
        <p className="font-bold text-green-700">
          {Capitalize(SAVE)} ₹{CurrencyConverter(savedAmount)}
        </p>
        <Button
          className="bg-red-600 text-white rounded-lg py-2 px-4 hover:transition duration-150 hover:scale-110"
          onClick={() => onRemove(item)}
          children={REMOVE.toUpperCase()}
        />
      </div>
    </div>
  );
};

export default CartTile;
