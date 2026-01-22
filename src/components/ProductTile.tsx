import { currConveter } from "../utils/CurrConveter";
import type { Product } from "../Types/ApiResponse";

type ProductTileProps = {
  item: Product;
};

const ProductTile = ({ item }: ProductTileProps) => {
  return (
    <div>
      <div className="flex flex-col space-y-2 space-x-2 cursor-pointer border-2 mt-4  p-2 mr-4 bg-white pb-6">
        <img
          src={item.images[0]}
          alt={item.title}
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
