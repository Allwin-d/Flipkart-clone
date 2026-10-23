import { useNavigate } from "react-router-dom";
import { CurrencyConverter } from "../../utils/utilityFunctions";
import { getOriginalPrice } from "../../utils/utilityFunctions";
import { DISCOUNT_PERCENTAGE } from "../../Constants/ConstantVariables/constantsVariables";
import type { productTileProps } from "./productTile.types";
const ProductTile = ({
  id,
  index,
  images,
  title,
  brand,
  price,
  discountPercentage,
}: productTileProps) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <div
      key={index}
      className="m-1 flex min-w-0 flex-col items-center justify-start space-y-2 rounded-lg p-2 text-center transition duration-150 hover:cursor-pointer hover:shadow-lg sm:m-2 sm:p-3 lg:m-4"
      onClick={() => handleNavigate(id)}
    >
      <img
        src={images}
        alt={title}
        className="h-32 w-full rounded-lg bg-gray-100 object-contain sm:h-44 lg:h-56"
      />
      <h1 className="text-sm font-bold text-gray-500 sm:text-base">{brand}</h1>
      <p className="line-clamp-2 text-sm font-medium text-gray-700 sm:text-base">{title}</p>
      <div className="flex flex-wrap justify-center gap-x-2" key={index}>
        <p className="text-base font-bold sm:text-xl">₹{CurrencyConverter(price)}</p>
        <p className="text-sm font-medium text-gray-500 line-through sm:text-base">
          ₹{getOriginalPrice(CurrencyConverter(price), discountPercentage)}
        </p>
      </div>
      <p className="text-base font-medium text-green-600 sm:text-lg">
        {discountPercentage} {DISCOUNT_PERCENTAGE}
      </p>
    </div>
  );
};

export default ProductTile;
