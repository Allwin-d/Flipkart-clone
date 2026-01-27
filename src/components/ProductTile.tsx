import { currConveter } from "../utils/utilityFunctions";
import type { Product } from "../Types/ApiResponse";
import { useNavigate } from "react-router-dom";

type ProductTileProps = {
  item: Product;
};

const ProductTile = ({ item }: ProductTileProps) => {
  const navigate = useNavigate();

  function handleClick(id: number) {
    navigate(`/productDetails/${id}`);
  }

  return (
    <div key={item.id}>
      <div className="flex flex-col space-y-2 space-x-2 cursor-pointer border-2 mt-4  p-2 mr-4 bg-white pb-6">
        <img
          src={item.images[0]}
          alt={item.title}
          onClick={() => handleClick(item.id)}
          className="hover:scale-125 transition ease-out duration-150 h-42 w-52"
        />
        <p className="text-center font-bold">{item.title}</p>
        <p className="text-center font-bold">
          From {currConveter(item.price).slice(0, 9)}
        </p>
      </div>
    </div>
  );
};

export default ProductTile;
