import { currConveter } from "../utils/CurrConveter";
import type { Product } from "../Types/ApiResponse";

type ProductTileProps = {
  item: Product;
};

const ProductTile = ({ item }: ProductTileProps) => {
  return (
    <div>
      <div className="flex flex-col space-y-2 space-x-2 cursor-pointer border-2 mt-4  p-2 mr-4 bg-white">
        <img src={item.images[0]} alt={item.title} />
        <p className="text-center">{item.title}</p>
        <p className="text-center">From {currConveter(item.price)}</p>
      </div>
    </div>
  );
};

export default ProductTile;
