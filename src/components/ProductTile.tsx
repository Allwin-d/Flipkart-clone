import { useNavigate } from "react-router-dom";
import { CurrencyConverter } from "../utils/utilityFunctions";
import { OriginalPrice } from "../utils/utilityFunctions";
import { DISCOUNT } from "../Constants/Constants";

type productTileProps = {
  id: number;
  index: number;
  images: string;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
};

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
    console.log("You have clicked this Id : ", id);
    navigate(`/productDetails/${id}`);
  };

  return (
    <div
      key={index}
      className="flex flex-col items-center justify-center space-y-2 m-8 hover:shadow-lg transition duration-150 hover:cursor-pointer p-2 hover:scale-105"
      onClick={() => handleNavigate(id)}
    >
      <img
        src={images}
        alt={title}
        className="w-60 h-60 bg-gray-100 rounded-lg"
      />
      <h1 className="font-bold text-xl text-gray-500">{brand}</h1>
      <p className="font-medium text-gray-700">{title}</p>
      <div className="flex flex-row space-x-4" key={index}>
        <p className="text-xl font-bold ">₹{CurrencyConverter(price)}</p>
        <p className="line-through text-gray-500 font-medium">
          ₹{OriginalPrice(CurrencyConverter(price), discountPercentage)}
        </p>
      </div>
      <p className="text-green-600 font-medium text-xl">
        {discountPercentage} {DISCOUNT}
      </p>
    </div>
  );
};

export default ProductTile;
