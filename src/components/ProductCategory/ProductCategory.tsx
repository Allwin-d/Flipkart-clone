import { useNavigate } from "react-router-dom";
import type { ProductType } from "./productCategory.types";

const ProductCategory = ({ data, title }: ProductType) => {
  const navigate = useNavigate();

  const handleClick = (itemId: number) => {
    navigate(`productDetails/${itemId}`);
  };

  return (
    <div className="my-6">
      <div className="flex flex-col space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">{title}</p>
        <div className="flex items-stretch gap-4 overflow-x-auto pb-3 scrollbar-hide sm:gap-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex w-36 shrink-0 cursor-pointer flex-col items-center text-center transition-all duration-150 hover:scale-105 sm:w-48 lg:w-52"
              onClick={() => handleClick(item.id)}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-32 w-full object-contain sm:h-40 lg:h-48"
              ></img>
              <p className="line-clamp-2 font-bold text-sm sm:text-base">{item.title}</p>
              <p className="text-sm sm:text-base">{item.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
