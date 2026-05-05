import RatingAndStock from "../Ratings/Ratings";
import PriceSection from "../PriceSection/PriceSection";
import { REMOVE } from "../../Constants/ConstantVariables/constantsVariables";
import { Capitalize } from "../../utils/utilityFunctions";
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

  return (
    <div key={id} className="flex items-center justify-around border-b pb-5 ">
      <img
        src={images}
        alt={title}
        className="w-[200px] h-[200px] object-contain cursor-pointer"
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
            className="rounded-full bg-gray-300 px-4 py-2 font-bold"
            onClick={() => onDecrease(item)}
            children="-"
          />

          <p className="font-bold">{item.quantity}</p>
          <Button
            className={`rounded-full bg-gray-300 px-4 py-2 font-bold`}
            onClick={() => onIncrease(item)}
            children="+"
          />
        </div>
      </div>
      <Button
        className="bg-red-600 text-white rounded-lg p-2 hover:transition duration-150 hover:scale-110"
        onClick={() => onRemove(item)}
        children={REMOVE.toUpperCase()}
      />
    </div>
  );
};

export default CartTile;
