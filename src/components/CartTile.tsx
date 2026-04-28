import type { CartItem } from "../Types/ApiResponse";
import RatingAndStock from "./Ratings";
import PriceSection from "./PriceSection";
import { REMOVE } from "../Constants/Constants";
import { Capitalize } from "../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";

type cartTileProps = {
  id: number;
  images: string;
  title: string;
  category: string;
  rating: number;
  stock: number;
  price: number;
  discountPercentage: number;
  quantity: number;
  item: CartItem;
  onRemove: (item: CartItem) => void;
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
};

const CartTile = ({
  id,
  images,
  title,
  category,
  rating,
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

        <RatingAndStock rating={rating} NoOfRatings={rating} stocks={stock} />

        <PriceSection
          FixedPrice={price}
          discountPercentage={discountPercentage}
        />

        <div className="flex flex-row justify-center items-center space-x-10 text-xl">
          <button
            className="rounded-full bg-gray-300 px-4 py-2 font-bold"
            onClick={() => onDecrease(item)}
          >
            -
          </button>
          <p className="font-bold">{item.quantity}</p>
          <button
            className="rounded-full bg-gray-300 px-4 py-2 font-bold"
            onClick={() => onIncrease(item)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="bg-red-600 text-white rounded-lg p-2 hover:transition duration-150 hover:scale-110 "
        onClick={() => onRemove(item)}
      >
        {REMOVE.toUpperCase()}
      </button>
    </div>
  );
};

export default CartTile;
